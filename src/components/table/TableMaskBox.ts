import { TableFlowGraph } from '../../index';
import { createClassElement, setStyles } from '../../lib/dom';
import { PositionAndSize } from '../../types';
import TableCell from './TableCell';

/**
 * table-flow-graph anchor controller
 */
export default class TableMaskBox {
  graphInstance: TableFlowGraph;
  public element: HTMLElement;
  public disabled: boolean;

  constructor(parentEl: HTMLElement, targetCell: TableCell, graphInstance: TableFlowGraph) {
    this.graphInstance = graphInstance;
    this.disabled = false;
    this.element = createClassElement('div', 'tfgraph-table-mask-cell', parentEl);
    const nodeEl = createClassElement('div', 'tfgraph-table-mask-node', this.element);
    nodeEl.innerText = targetCell.nodeData.title;
    // setStyles(this.element, {
    //   top: top + 'px',
    //   left: left + 'px',
    //   width: width + 'px',
    //   height: height + 'px',
    // });
    this.element.addEventListener('click', () => {
      if (!this.disabled) this.graphInstance.tableController.submitCellChange();
    });
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
    if (!this.disabled) {
      this.disabled = true;
      this.element.classList.add('disabled');
    }
  }

  enable() {
    // TODO
    if (this.disabled) {
      this.disabled = false;
      this.element.classList.remove('disabled');
    }
  }
}
