import { createClassElement, removeElement } from '../../../lib/dom';
import { DialogOptions } from '../../../index';
import { Icon } from '../icon/Icon';

/**
 * table-flow-graph dialog
 */
export default class Dialog {
  targetElement: HTMLElement;
  public element: HTMLElement;
  public maskElement: HTMLElement;
  public boxElement: HTMLElement;
  public titleBarElement: HTMLElement;
  public closeBtnElement: HTMLElement;
  public title: string;

  constructor(options: DialogOptions) {
    this.title = options.title;
    this.targetElement = options.targetElement
      ? options.targetElement
      : document.getElementsByTagName('body')[0];
    this.element = createClassElement('div', 'tfgraph-dialog tfgraph-wrapper', this.targetElement);
    this.maskElement = createClassElement('div', 'tfgraph-dialog-mask', this.element);
    this.boxElement = createClassElement('div', 'tfgraph-dialog-box', this.element);
    this.renderTitleBar();
    this.boxElement.appendChild(options.contentElement);
    this.targetElement.classList.add('overflow-hidden');
    this.maskElement.addEventListener('click', () => this.close());
  }

  renderTitleBar() {
    this.titleBarElement = createClassElement('div', 'tfgraph-dialog-bar', this.boxElement);
    const titleEl = createClassElement('div', 'tfgraph-dialog-bar-title', this.titleBarElement);
    titleEl.innerText = this.title;
    this.closeBtnElement = createClassElement(
      'div',
      'tfgraph-dialog-bar-btn',
      this.titleBarElement,
    );
    new Icon(this.closeBtnElement, { name: 'x2', size: 18 });
    this.closeBtnElement.addEventListener('click', () => this.close());
  }

  public close() {
    this.closeBtnElement.removeEventListener('click', () => this.close());
    this.maskElement.removeEventListener('click', () => this.close());
    removeElement(this.element);
    this.targetElement.classList.remove('overflow-hidden');
  }
}
