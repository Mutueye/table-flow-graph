import { TableFlowGraph } from '../../index';
import { createClassElement } from '../../lib/dom';
import TableCell from '../table/TableCell';
import Anchor from './Anchor';

/**
 * table-flow-graph anchor controller
 */
export default class AnchorController {
  public element: HTMLElement;
  public anchors: Anchor[];
  public hoveredAnchor: Anchor; // current Anchor that mouse hoverd
  graphInstance: TableFlowGraph;

  constructor(graphInstance: TableFlowGraph) {
    this.graphInstance = graphInstance;
    this.anchors = [];
    this.element = createClassElement('div', 'tfgraph-anchor-layer', graphInstance.element);
  }

  public renderAnchors() {
    this.element.innerHTML = '';
    this.anchors = [];
    this.graphInstance.tableController.cells.forEach((cell) => {
      // console.log('cell:::::::::::', cell);
      this.createAnchors(cell);
    });
  }

  public setHoveredAnchor(anchor: Anchor | undefined) {
    this.hoveredAnchor = anchor;
  }

  public resetPosition() {
    if (this.anchors && this.anchors.length > 0) {
      this.anchors.forEach((anchor) => {
        anchor.setPosition();
      });
    }
  }

  public setAnchorsVisible(visible: boolean) {
    if (this.anchors && this.anchors.length > 0) {
      this.anchors.forEach((anchor: Anchor) => {
        anchor.setVisible(visible);
      });
    }
  }

  // create anchors for one cell
  createAnchors(cell: TableCell) {
    for (let row = cell.row; row < cell.row + cell.rowSpan; row++) {
      for (let col = cell.column; col < cell.column + cell.colSpan; col++) {
        if (row === 0) {
          new Anchor('top', row, col, this.graphInstance);
          new Anchor('topright', row, col, this.graphInstance);
          if (cell.column === 0) {
            new Anchor('topleft', row, col, this.graphInstance);
          }
        }
        if (col === 0) {
          new Anchor('left', row, col, this.graphInstance);
          new Anchor('bottomleft', row, col, this.graphInstance);
        }
        if (col === cell.column + cell.colSpan - 1) {
          new Anchor('right', row, col, this.graphInstance);
        }
        if (row === cell.row + cell.rowSpan - 1) {
          new Anchor('bottom', row, col, this.graphInstance);
        }
        if (col === cell.column + cell.colSpan - 1 || row === cell.row + cell.rowSpan - 1) {
          new Anchor('bottomright', row, col, this.graphInstance);
        }
        if (cell.hasNode) {
          if (col === cell.column) {
            new Anchor('left', row, col, this.graphInstance, true, false);
            if (row < cell.row + cell.rowSpan - 1) {
              new Anchor('bottomleft', row, col, this.graphInstance, true, false);
            }
          }
          if (col === cell.column + cell.colSpan - 1) {
            new Anchor('right', row, col, this.graphInstance, true, false);
            if (row < cell.row + cell.rowSpan - 1) {
              new Anchor('bottomright', row, col, this.graphInstance, true, false);
            }
          }
          if (row === cell.row) {
            new Anchor('top', row, col, this.graphInstance, false, true);
            if (col < cell.column + cell.colSpan - 1) {
              new Anchor('topright', row, col, this.graphInstance, false, true);
            }
          }
          if (row === cell.row + cell.rowSpan - 1) {
            new Anchor('bottom', row, col, this.graphInstance, false, true);
            if (col < cell.column + cell.colSpan - 1) {
              new Anchor('bottomright', row, col, this.graphInstance, false, true);
            }
          }
        }
      }
    }
    if (!cell.hasNode) {
      new Anchor('center', cell.row, cell.column, this.graphInstance);
    }
  }
}
