import { TableFlowGraph } from '../index';
import { createClassElement, removeElement } from '../lib/dom';
import { LineGroupOptions, Position } from '../types';
import Anchor from './Anchor';
import LineSegment from './LineSegment';

/**
 * table-flow-graph line group
 */
export default class LineGroup {
  public element: HTMLElement;
  public isDrawingActive: boolean;
  public anchorIds: string[];
  public anchors: Anchor[];
  // public lineCursorEnd: HTMLElement;
  // public lineCursoeStart: HTMLElement;
  public cursorLine: LineSegment; // line currently drawing at end
  public lines: LineSegment[];
  public cursorLineStartPosition: Position;
  public graphInstance: TableFlowGraph;
  public hovered: boolean; // is mouse hover

  constructor(
    parentElement: HTMLElement,
    options: LineGroupOptions,
    graphInstance: TableFlowGraph,
  ) {
    this.element = createClassElement('div', 'tfgraph-line-group', parentElement);
    this.isDrawingActive = options.isDrawingActive;
    // if (this.isDrawingActive) {
    //   graphInstance.currentDrawingLine = this;
    // }
    this.anchorIds = options.anchorIds;
    this.graphInstance = graphInstance;
    this.drawLines();
  }

  public addLineSegment(anchorId) {
    if (!this.anchorIds.includes(anchorId)) {
      this.anchorIds.push(anchorId);
      this.drawLines();
    }
  }

  public onDoubleClick() {
    if (this.hovered) {
      if (this.isDrawingActive) {
        this.graphInstance.lineController.endDrawLine();
      } else {
        this.graphInstance.lineController.removeLineGroup(this);
      }
    }
  }

  public drawLines() {
    this.anchors = [];
    this.lines = [];
    if (this.anchorIds.length === 0) return;
    this.anchorIds.forEach((anchorId) => {
      const targetAnchor = this.graphInstance.anchors.find((anchor) => anchor.id === anchorId);
      this.anchors.push(targetAnchor);
    });
    this.element.innerHTML = '';
    const pointList: Position[] = this.anchors.map((anchor) => ({
      x: anchor.posX,
      y: anchor.posY,
    }));
    if (pointList.length > 1) {
      for (let i = 0; i < pointList.length - 1; i++) {
        const line = new LineSegment(this, {
          positionA: pointList[i],
          positionB: pointList[i + 1],
          thickness: 2,
          isStart: i === 0,
          isEnd: i === pointList.length - 2 && !this.isDrawingActive,
        });
        this.lines.push(line);
      }
    }
    // add line between last anchor position and mouse position when drawing
    if (this.isDrawingActive) {
      this.cursorLineStartPosition = pointList[pointList.length - 1];
      // draw cursor line
      this.cursorLine = new LineSegment(this, {
        positionA: this.cursorLineStartPosition,
        positionB: this.graphInstance.mousePosition,
        thickness: 2,
        isStart: pointList.length === 0,
        isEnd: true,
      });
      this.lines.push(this.cursorLine);
    }
  }

  public setHovered(hovered = true) {
    this.hovered = hovered;
    this.lines.forEach((line) => {
      line.setHoverd(hovered);
    });
  }

  public endDrawing() {
    // removeElement(this.cursorLine.element);
    this.isDrawingActive = false;
    this.drawLines();
  }

  public escapeDrawing() {
    if (this.cursorLine) {
      if (this.anchorIds.length > 0) {
        this.anchorIds.pop();
        if (this.anchorIds.length === 0) {
          removeElement(this.element);
          // remove the last anchor id in this line group
          this.graphInstance.lineController.lineAnchorIds =
            this.graphInstance.lineController.lineAnchorIds.filter(
              (lineArray) => lineArray.length > 1,
            );
          this.graphInstance.lineController.endDrawLine();
        } else {
          this.drawLines();
        }
      }
    }
  }

  public onMouseMove(graphInstance: TableFlowGraph) {
    if (this.cursorLine) {
      let targetPosition = graphInstance.mousePosition;
      // snap to hovered anchor
      if (graphInstance.hoveredAnchor && !this.anchorIds.includes(graphInstance.hoveredAnchor.id)) {
        targetPosition = {
          x: graphInstance.hoveredAnchor.posX,
          y: graphInstance.hoveredAnchor.posY,
        };
      }
      this.cursorLine.drawLine(this.cursorLineStartPosition, targetPosition);
    }
  }
}
