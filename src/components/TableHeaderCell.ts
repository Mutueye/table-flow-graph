import { TableFlowGraph } from '../index';
import { createClassElement } from '../lib/dom';
import { TFGraphColumn } from '../types';

/**
 * table-flow-graph tabel header cell
 */
export default class TableHeaderCell {
  public element: HTMLElement;
  public column: number;

  constructor(
    parentElement: HTMLElement,
    data: TFGraphColumn,
    column: number,
    graphInstance: TableFlowGraph,
  ) {
    this.column = column;
    this.element = this.createElement(parentElement, data, column, graphInstance);
  }

  createElement(
    parentElement: HTMLElement,
    data: TFGraphColumn,
    column,
    graphInstance: TableFlowGraph,
  ): HTMLElement {
    const el = createClassElement('th', 'tfgraph-th', parentElement);
    el.innerHTML = data.title;
    if (data.width) el.setAttribute('width', data.width);
    el.setAttribute('id', `${graphInstance.id}_col_${column}`);
    return el;
  }
}
