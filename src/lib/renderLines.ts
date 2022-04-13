import { TableFlowGraph } from '..';
import { createClassElement } from './dom';

export function renderLines(graphInstance: TableFlowGraph) {
  createClassElement('div', 'tfgraph-line-layer', graphInstance.element);
}
