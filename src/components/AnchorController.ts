import { TableFlowGraph } from '../index';
import { createClassElement } from '../lib/dom';

/**
 * table-flow-graph anchor controller
 */
export default class AnchorController {
  public element: HTMLElement;
  graphInstance: TableFlowGraph;

  constructor(graphInstance: TableFlowGraph) {
    this.graphInstance = graphInstance;
    this.element = createClassElement('div', 'tfgraph-anchor-layer', graphInstance.element);
  }
}
