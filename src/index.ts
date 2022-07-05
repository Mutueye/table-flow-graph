import { cloneDeep, isEqual } from 'lodash-es';

import './styles/index.scss';
import { createClassElement, removeElement } from './lib/dom';
import { renderAnchorsLayer, renderLinesLayer, renderTable } from './lib/renderTools';
import { Mode, Position, TFGraphOptions } from './types';
import TableCell from './components/TableCell';
import Anchor from './components/Anchor';
import Toolbar from './components/Toolbar';
import LineGroup from './components/LineGroup';
// import { debounce } from './lib/utils';

export class TableFlowGraph {
  public element: HTMLElement;
  public options: TFGraphOptions;
  public id: string;
  public cells: TableCell[];
  public anchors: Anchor[];
  public toolbar: Toolbar;
  public linesLayer: HTMLElement;
  public anchorsLayer: HTMLElement;
  public isAlive: boolean;
  public mode: Mode;
  public mousePosition: Position;
  public hoveredAnchor: Anchor; // current Anchor that mouse hoverd
  public lineAnchorIds: string[][]; // anchor ids to draw lines
  public originLineAnchorIds: string[][]; // compare to lineAnchorIds to determine if lines are changed
  public isDrawingLine: boolean;
  public currentDrawingLine: LineGroup;

  constructor(el: HTMLElement, options: TFGraphOptions) {
    if (!el) {
      throw new Error('no element is specified to initialize TableFlowGraph');
    }

    this.load(el, options);

    // resize trigger render
    // if (this.options.refreshOnResize) {
    //   window.addEventListener(
    //     'resize',
    //     debounce(() => this.render(), 500),
    //     false,
    //   );
    // }

    window.addEventListener('resize', this, false);
    window.addEventListener('keydown', this, false);
    this.element.addEventListener('mousemove', this, false);

    this.isAlive = true;
  }

  // handle addEventListener events
  handleEvent(event) {
    switch (event.type) {
      case 'resize':
        this.onResize();
        break;
      case 'mousemove':
        this.onMourseMove(event);
        break;
      case 'keydown':
        this.onKeydown(event);
        break;
      default:
        break;
    }
  }

  public load(el: HTMLElement, options: TFGraphOptions) {
    // use id as unique key, to support multiple table-flow-graph instances in one page.
    if (el.getAttribute('id')) {
      this.id = el.getAttribute('id');
    } else {
      this.id = 'id' + (Math.random() * 100000).toFixed(0);
    }

    el.innerHTML = '';

    this.options = options;
    if (typeof this.options.rows !== 'undefined') this.options.totalRows = this.options.rows.length;
    if (typeof this.options.columns !== 'undefined')
      this.options.totalColumns = this.options.columns.length;
    // this.options.mode = options.mode ? options.mode : 'view';
    if (this.options.lines && Array.isArray(this.options.lines)) {
      this.lineAnchorIds = this.options.lines;
    } else {
      this.lineAnchorIds = [];
    }
    this.originLineAnchorIds = cloneDeep(this.lineAnchorIds);

    // create toolbar and edit state
    if (this.options.isEditor) {
      this.mode = 'edit';
      this.toolbar = new Toolbar(el, this);
    } else {
      this.mode = 'preview';
    }

    // root container element
    this.element = createClassElement('div', 'tfgraph', el);
    this.cells = [];
    this.anchors = [];

    this.render();
  }

  public render() {
    this.element.innerHTML = '';
    this.linesLayer = renderLinesLayer(this);
    // if (this.options.mode === 'edit') {
    this.anchorsLayer = renderAnchorsLayer(this);
    // render table
    renderTable(this);
    // render lines
    setTimeout(() => {
      this.lineAnchorIds.forEach((lineGroup) => {
        new LineGroup(this.linesLayer, { anchorIds: lineGroup, isDrawingActive: false }, this);
      });
    }, 100);
  }

  onMourseMove(event) {
    const rect = this.element.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    this.mousePosition = { x: offsetX, y: offsetY };
    // console.log('event:::::::::', offsetX, offsetY);
    if (this.isDrawingLine && this.currentDrawingLine) {
      this.currentDrawingLine.onMouseMove(this);
    }
  }

  onResize() {
    if (this.anchors && this.anchors.length > 0) {
      this.anchors.forEach((anchor) => {
        anchor.setPosition();
      });
    }
  }

  onKeydown = (e) => {
    // console.group('keyboard event');
    // console.log('event', e);
    // console.log('event.code', e.code);
    // console.log('event.key', e.key);
    // console.log('event.altKey', e.altKey);
    // console.log('event.ctrlKey', e.ctrlKey);
    // console.log('event.shiftKey', e.shiftKey);
    // console.log('event.metaKey', e.metaKey);
    // console.log('event.getModifierState()', e.getModifierState('Alt'));
    // console.groupEnd();
    if (e.code === 'Enter') {
      if (this.isDrawingLine) {
        this.endDrawLine();
      }
    } else if (e.code === 'Escape') {
      if (this.isDrawingLine) {
        this.currentDrawingLine.escapeDrawing();
      }
    }
  };

  update() {
    if (!this.isAlive) {
      return;
    }
  }

  destroy() {
    if (!this.isAlive) {
      return;
    }

    window.removeEventListener('resize', this, false);
    this.element.removeEventListener('mousemove', this, false);
    this.isAlive = false;
  }

  public startDrawLine() {
    this.isDrawingLine = true;
    this.originLineAnchorIds = cloneDeep(this.lineAnchorIds);
  }

  public endDrawLine() {
    this.isDrawingLine = false;
    if (this.currentDrawingLine) {
      this.currentDrawingLine.endDrawing();
      if (this.currentDrawingLine.anchorIds.length <= 1) {
        this.removeLine(this.currentDrawingLine);
      }
      this.currentDrawingLine = undefined;
    }
    if (!isEqual(this.originLineAnchorIds, this.lineAnchorIds)) {
      // trigger event: linesChanged
      this.onChangeLines();
    }
  }

  public onChangeLines() {
    if (typeof this.options.onChangeLines === 'function') {
      this.options.onChangeLines(this.lineAnchorIds);
    }
  }

  public removeLine(line: LineGroup) {
    removeElement(line.element);
    this.lineAnchorIds = this.lineAnchorIds.filter((lines) => !isEqual(lines, line.anchorIds));
    if (!isEqual(this.lineAnchorIds, this.originLineAnchorIds)) {
      this.originLineAnchorIds = cloneDeep(this.lineAnchorIds);
      // trigger event: linesChanged
      this.onChangeLines();
    }
  }

  public changeMode(mode: Mode) {
    if (this.mode !== mode) {
      this.mode = mode;
      this.anchors.forEach((anchor: Anchor) => {
        anchor.setVisible(mode === 'edit');
      });
    }
  }

  public setHoveredAnchor(anchor: Anchor | undefined) {
    this.hoveredAnchor = anchor;
  }

  public createLineGroup(anchorId) {
    this.startDrawLine();
    this.lineAnchorIds.push([anchorId]);
    this.currentDrawingLine = new LineGroup(
      this.linesLayer,
      { anchorIds: this.lineAnchorIds[this.lineAnchorIds.length - 1], isDrawingActive: true },
      this,
    );
  }

  public addLineSegment(anchorId) {
    if (this.isDrawingLine && this.currentDrawingLine) {
      this.currentDrawingLine.addLineSegment(anchorId);
    }
  }

  // TODO press 'enter' or 'space' to end drawing line
  // TODO press 'esc' to delete last line anchor point
}
