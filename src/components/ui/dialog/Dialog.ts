import { createClassElement, removeElement, setStyles } from '../../../lib/dom';

/**
 * table-flow-graph dialog
 */
export default class Dialog {
  targetElement: HTMLElement;
  public element: HTMLElement;
  public maskElement: HTMLElement;
  public boxElement: HTMLElement;
  // public rendered: boolean;
  // public timeoutId: number | null;

  constructor(targetElement: HTMLElement) {
    this.targetElement = targetElement;
    this.element = createClassElement('div', 'tfgraph-dialog', this.targetElement);
    this.maskElement = createClassElement('div', 'tfgraph-dialog-mask', this.element);
    setStyles(this.targetElement, { overflow: 'hidden' });
    this.maskElement.addEventListener('click', () => this.close());
  }

  close() {
    removeElement(this.element);
  }
}
