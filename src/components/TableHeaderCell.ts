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
    if (data.width) {
      // TODO load width value from options
      let width = data.width;
      switch (data.width) {
        case 'large':
          width = '200';
          break;
        case 'md':
          width = '170';
          break;
        case 'sm':
          width = '130';
          break;
        case 'xs':
          width = '105';
          break;
        default:
          width = data.width;
          break;
      }
      el.setAttribute('width', width);
    }
    el.setAttribute('id', `${graphInstance.id}_col_${column}`);
    return el;
  }
}
