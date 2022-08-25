import { NodeType, TableFlowGraph } from '../../../index';
import { createClassElement, setStyles } from '../../../lib/dom';
import Popup from '../../ui/popup/Popup';
import TableCell from '../TableCell';
import { NodeStyle } from './nodeUtils';

/**
 * table-flow-graph node
 */
export default class Node {
  public graphInstance: TableFlowGraph;
  public element: HTMLElement;
  public tableCell: TableCell;
  public type: NodeType;
  private hoverd: boolean;

  constructor(cell: TableCell) {
    this.tableCell = cell;
    this.graphInstance = this.tableCell.graphInstance;
    this.hoverd = false;
    this.createNode();
  }

  createNode() {
    this.element = createClassElement('div', 'tfgraph-node', this.tableCell.element);
    const data = this.tableCell.nodeData;
    this.type = data.type ? data.type : 'default';
    setStyles(this.element, NodeStyle[this.type].normalStyle);
    // this.element.classList.add(data.type ? data.type : 'default');
    if (data.isBtn && this.graphInstance.mode !== 'edit') this.element.classList.add('isBtn');
    if (typeof this.graphInstance.options.renderNode === 'function') {
      this.element.appendChild(this.graphInstance.options.renderNode(data));
    } else {
      this.element.innerText = data.title;
    }
  }

  toggleHovered(hovered: boolean) {
    this.hoverd = hovered;
    this.element.setAttribute('style', '');
    if (this.hoverd) {
      setStyles(this.element, NodeStyle[this.type].hoverStyle);
    } else {
      setStyles(this.element, NodeStyle[this.type].normalStyle);
    }
  }

  public setViewerControls() {
    this.element.addEventListener('click', () => this.onClickNode());
    this.element.addEventListener('mouseenter', () => this.toggleHovered(true));
    this.element.addEventListener('mouseleave', () => this.toggleHovered(false));
    if (this.tableCell.nodeData.showPopup) {
      let contentEl: HTMLElement;
      if (typeof this.graphInstance.options.renderNodeHoverPopup === 'function') {
        contentEl = this.graphInstance.options.renderNodeHoverPopup(this.tableCell.nodeData);
      } else {
        contentEl = createClassElement('div', 'flex flex-col items-center p-30');
        contentEl.innerHTML = this.tableCell.nodeData.title;
      }

      new Popup(this.element, {
        placement: 'top',
        contentElement: contentEl,
      });
    }
  }

  onClickNode() {
    if (typeof this.graphInstance.options.onClickNode === 'function') {
      this.graphInstance.options.onClickNode(this.tableCell.nodeData, this.element);
    }
  }
}
