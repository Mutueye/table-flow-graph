import { TableFlowGraph } from '../../index';
import { createClassElement, setStyles } from '../../lib/dom';
import { PositionAndSize } from '../../types';

/**
 * table-flow-graph anchor controller
 */
export default class TableMaskBox {
  graphInstance: TableFlowGraph;
  public element: HTMLElement;

  constructor(parentEl: HTMLElement, graphInstance: TableFlowGraph) {
    this.graphInstance = graphInstance;
    this.element = createClassElement('div', 'tfgraph-table-mask-cell', parentEl);
    // setStyles(this.element, {
    //   top: top + 'px',
    //   left: left + 'px',
    //   width: width + 'px',
    //   height: height + 'px',
    // });
  }

  setPositinAndSize(pos_size: PositionAndSize) {
    setStyles(this.element, {
      top: pos_size.top + 'px',
      left: pos_size.left + 'px',
      width: pos_size.width + 'px',
      height: pos_size.height + 'px',
    });
  }

  disable() {
    // TODO
  }

  enable() {
    // TODO
  }
}
