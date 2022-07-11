import { TableFlowGraph } from '../index';
import { createClassElement } from '../lib/dom';
import { TFGraphNode } from '../types';

/**
 * table-flow-graph tabel cell
 */
export default class TableCell {
  public graphInstance;
  public element: HTMLElement;
  public nodeEl: HTMLElement;
  public nodeData?: TFGraphNode;
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
    this.graphInstance = graphInstance;
    this.row = row;
    this.column = column;
    this.element = this.createTabelCell(data, row, column, this.graphInstance);
    parentElement.appendChild(this.element);
    // add anchors for current table cell
    // this.createAnchors(graphInstance);
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
      if (data.isBtn && this.graphInstance.mode !== 'edit') node.classList.add('isBtn');
      node.innerText = data.title;
      // node.innerText = data.id;
      el.appendChild(node);
      this.hasNode = true;
      this.nodeEl = node;
      this.nodeData = data;
      this.rowSpan = data.rowSpan;
      this.colSpan = data.colSpan;
    } else {
      this.rowSpan = 1;
      this.colSpan = 1;
      this.hasNode = false;
    }
    return el;
  }
}
