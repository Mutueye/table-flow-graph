import { TableFlowGraph } from '../index';
import { createClassElement } from '../lib/dom';

/**
 * table-flow-graph tabel
 */
export default class Table {
  public element: HTMLElement;

  constructor(graphInstance: TableFlowGraph) {
    this.element = createClassElement('table', 'tfgraph-table', graphInstance.element);
  }
}
