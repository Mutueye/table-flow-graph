import { createClassElement } from '../lib/dom';
import { TFGraphNode } from '../types';

export default class TFGraphCell {
  public element: HTMLElement;

  constructor(parentElement: HTMLElement, data: TFGraphNode) {
    this.element = this.createTabelCell(data);
    parentElement.appendChild(this.element);
  }

  createTabelCell(data: TFGraphNode): HTMLElement {
    const el = createClassElement('div', 'tfgraph-cell');
    const node = createClassElement('button', 'tfgraph-node');
    node.classList.add(data.type);
    if (data.isBtn) node.classList.add('isBtn');
    node.innerText = data.title;
    el.appendChild(node);
    el.setAttribute('id', `cell_${data.row}_${data.column}`);
    return el;
  }
}
