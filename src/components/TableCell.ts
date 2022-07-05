import { TableFlowGraph } from '../index';
import { createClassElement } from '../lib/dom';
import { TFGraphNode } from '../types';
import Anchor from './Anchor';

/**
 * table-flow-graph tabel cell
 */
export default class TableCell {
  public element: HTMLElement;
  public nodeEl: HTMLElement;
  public hasNode: boolean;
  public row: number;
  public column: number;
  public rowSpan: number;
  public colSpan: number;

  constructor(
    parentElement: HTMLElement,
    data: TFGraphNode | null,
    row: number,
    column: number,
    graphInstance: TableFlowGraph,
  ) {
    this.row = row;
    this.column = column;
    this.element = this.createTabelCell(data, row, column, graphInstance);
    parentElement.appendChild(this.element);
    // add anchors for current table cell
    this.createAnchors(graphInstance);
  }

  createTabelCell(
    data: TFGraphNode | null,
    row,
    column,
    graphInstance: TableFlowGraph,
  ): HTMLElement {
    const el = createClassElement('div', 'tfgraph-cell');
    el.setAttribute('id', `${graphInstance.id}_cell_${row}_${column}`);
    if (data) {
      const node = createClassElement('button', 'tfgraph-node');
      node.classList.add(data.type);
      if (data.isBtn) node.classList.add('isBtn');
      node.innerText = data.title;
      // node.innerText = data.id;
      el.appendChild(node);
      this.hasNode = true;
      this.nodeEl = node;
      this.rowSpan = data.rowSpan;
      this.colSpan = data.colSpan;
    } else {
      this.rowSpan = 1;
      this.colSpan = 1;
      this.hasNode = false;
    }
    return el;
  }

  createAnchors(graphInstance: TableFlowGraph) {
    for (let row = this.row; row < this.row + this.rowSpan; row++) {
      for (let col = this.column; col < this.column + this.colSpan; col++) {
        if (row === 0) {
          new Anchor('top', row, col, graphInstance);
          new Anchor('topright', row, col, graphInstance);
          if (this.column === 0) {
            new Anchor('topleft', row, col, graphInstance);
          }
        }
        if (col === 0) {
          new Anchor('left', row, col, graphInstance);
          new Anchor('bottomleft', row, col, graphInstance);
        }
        if (col === this.column + this.colSpan - 1) {
          new Anchor('right', row, col, graphInstance);
        }
        if (row === this.row + this.rowSpan - 1) {
          new Anchor('bottom', row, col, graphInstance);
        }
        if (col === this.column + this.colSpan - 1 || row === this.row + this.rowSpan - 1) {
          new Anchor('bottomright', row, col, graphInstance);
        }
        if (this.hasNode) {
          if (col === this.column) {
            new Anchor('left', row, col, graphInstance, true, false);
            if (row < this.row + this.rowSpan - 1) {
              new Anchor('bottomleft', row, col, graphInstance, true, false);
            }
          }
          if (col === this.column + this.colSpan - 1) {
            new Anchor('right', row, col, graphInstance, true, false);
            if (row < this.row + this.rowSpan - 1) {
              new Anchor('bottomright', row, col, graphInstance, true, false);
            }
          }
          if (row === this.row) {
            new Anchor('top', row, col, graphInstance, false, true);
            if (col < this.column + this.colSpan - 1) {
              new Anchor('topright', row, col, graphInstance, false, true);
            }
          }
          if (row === this.row + this.rowSpan - 1) {
            new Anchor('bottom', row, col, graphInstance, false, true);
            if (col < this.column + this.colSpan - 1) {
              new Anchor('bottomright', row, col, graphInstance, false, true);
            }
          }
        }
      }
    }
    if (!this.hasNode) {
      new Anchor('center', this.row, this.column, graphInstance);
    }
  }
}
