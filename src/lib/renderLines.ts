import { TableFlowGraph } from '..';
import { createClassElement } from './dom';

export function renderLines(graphInstance: TableFlowGraph) {
  const linesLayerEl = createClassElement('div', 'tfgraph-line-layer', graphInstance.element);
  return linesLayerEl;
}
