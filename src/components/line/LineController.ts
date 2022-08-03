import { cloneDeep, isEqual } from 'lodash-es';
import { TableFlowGraph } from '../../index';
import { createClassElement, removeElement, setStyles } from '../../lib/dom';
import LineGroup from './LineGroup';

/**
 * table-flow-graph lines controller
 */
export default class LineController {
  public element: HTMLElement;
  public lineAnchorIds: string[][]; // anchor ids to draw lines
  public originLineAnchorIds: string[][]; // compare to lineAnchorIds to determine if lines are changed
  public isDrawingLine: boolean;
  public currentDrawingLine: LineGroup;
  public graphInstance: TableFlowGraph;
  public canDeleteColumn: boolean;
  public canDeleteRow: boolean;

  constructor(graphInstance: TableFlowGraph) {
    this.graphInstance = graphInstance;
    this.element = createClassElement('div', 'tfgraph-line-layer', this.graphInstance.element);
    const { options } = this.graphInstance;
    // this.options.mode = options.mode ? options.mode : 'view';
    if (options.lines && Array.isArray(options.lines)) {
      this.lineAnchorIds = options.lines;
    } else {
      this.lineAnchorIds = [];
    }
    this.originLineAnchorIds = cloneDeep(this.lineAnchorIds);
  }

  public renderLines() {
    this.element.innerHTML = '';
    this.lineAnchorIds.forEach((lineGroup) => {
      new LineGroup(
        this.element,
        { anchorIds: lineGroup, isDrawingActive: false },
        this.graphInstance,
      );
    });
    this.setColAndRowDeletable();
  }

  public startDrawLine() {
    this.isDrawingLine = true;
    this.graphInstance.toolbar.disable();
    // set lines layer below anchors layer when draing line
    setStyles(this.element, { zIndex: '1' });
    setStyles(this.graphInstance.anchorController.element, { zIndex: '2' });

    this.originLineAnchorIds = cloneDeep(this.lineAnchorIds);
  }

  public endDrawLine() {
    this.isDrawingLine = false;
    this.graphInstance.toolbar.enable();
    // set lines layer above anchors layer when draing line
    setStyles(this.element, { zIndex: '2' });
    setStyles(this.graphInstance.anchorController.element, { zIndex: '1' });

    if (this.currentDrawingLine) {
      this.currentDrawingLine.endDrawing();
      if (this.currentDrawingLine.anchorIds.length <= 1) {
        this.removeLineGroup(this.currentDrawingLine);
      }
      this.currentDrawingLine = undefined;
    }
    if (!isEqual(this.originLineAnchorIds, this.lineAnchorIds)) {
      // trigger event: linesChanged
      this.onChangeLines();
    }
  }

  setColAndRowDeletable() {
    const totalRows = this.graphInstance.options.totalRows;
    const totalColumns = this.graphInstance.options.totalColumns;
    this.canDeleteColumn = true;
    this.canDeleteRow = true;
    this.lineAnchorIds.forEach((line) => {
      line.forEach((id) => {
        const idArray = id.split('_');
        const row = idArray[1];
        const col = idArray[2];
        if (parseInt(col) === totalColumns - 1) {
          this.canDeleteColumn = false;
        }
        if (parseInt(row) === totalRows - 1) {
          this.canDeleteRow = false;
        }
      });
    });
  }

  public onChangeLines() {
    this.setColAndRowDeletable();
    if (typeof this.graphInstance.options.onChangeLines === 'function') {
      this.graphInstance.options.onChangeLines(this.lineAnchorIds);
    }
  }

  public removeLineGroup(line: LineGroup) {
    removeElement(line.element);
    this.lineAnchorIds = this.lineAnchorIds.filter((lines) => !isEqual(lines, line.anchorIds));
    if (!isEqual(this.lineAnchorIds, this.originLineAnchorIds)) {
      this.originLineAnchorIds = cloneDeep(this.lineAnchorIds);
      // trigger event: linesChanged
      this.onChangeLines();
    }
  }

  public createLineGroup(anchorId) {
    this.startDrawLine();
    this.lineAnchorIds.push([anchorId]);
    this.currentDrawingLine = new LineGroup(
      this.element,
      { anchorIds: this.lineAnchorIds[this.lineAnchorIds.length - 1], isDrawingActive: true },
      this.graphInstance,
    );
  }

  public addLineSegment(anchorId) {
    if (this.isDrawingLine && this.currentDrawingLine) {
      this.currentDrawingLine.addLineSegment(anchorId);
    }
  }

  public onMouseMove() {
    if (this.isDrawingLine && this.currentDrawingLine) {
      this.currentDrawingLine.onMouseMove(this.graphInstance);
    }
  }
}
