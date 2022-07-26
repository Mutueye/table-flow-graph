import { createClassElement, removeElement, setStyles } from '../../../lib/dom';
import { PopupOptions } from '../../../types';

/**
 * table-flow-graph popup
 */
export default class Popup {
  targetElement: HTMLElement;
  options: PopupOptions;
  public element: HTMLElement;
  public areaElement: HTMLElement;
  public boxElement: HTMLElement;
  public arrowElement: HTMLElement;
  public disabled: boolean;
  public rendered: boolean;
  public timeoutId: number | null;

  constructor(targetElement: HTMLElement, options: PopupOptions) {
    this.targetElement = targetElement;
    this.options = options;
    this.rendered = false;
  }

  public render() {
    const { placement = 'top', contentElement } = this.options;

    const targetRect = this.targetElement.getBoundingClientRect();
    this.element = createClassElement('div', 'tfgraph-popup', document.body);
    setStyles(this.element, {
      left: targetRect.left + 0.5 * targetRect.width + 'px',
      top: targetRect.top + 0.5 * targetRect.height + 'px',
    });

    this.areaElement = createClassElement('div', `tfgraph-popup-area ${placement}`, this.element);
    this.boxElement = createClassElement('div', 'tfgraph-popup-box', this.areaElement);
    this.arrowElement = createClassElement('div', 'tfgraph-popup-arrow', this.areaElement);
    if (contentElement) this.boxElement.appendChild(contentElement);

    const areaRect = this.areaElement.getBoundingClientRect();
    const arrowRect = this.arrowElement.getBoundingClientRect();
    const areaStyleObj: Partial<CSSStyleDeclaration> = {};
    const arrowStyleObj: Partial<CSSStyleDeclaration> = {};
    switch (placement) {
      case 'top':
        areaStyleObj.left = -0.5 * areaRect.width + 'px';
        areaStyleObj.bottom = 0.5 * targetRect.height + 'px';
        arrowStyleObj.left = 0.5 * (areaRect.width - arrowRect.width) + 'px';
        break;
      case 'right':
        areaStyleObj.left = 0.5 * targetRect.width + 'px';
        areaStyleObj.top = -0.5 * areaRect.height + 'px';
        arrowStyleObj.top = 0.5 * (areaRect.height - arrowRect.height) + 'px';
        break;
      case 'bottom':
        areaStyleObj.left = -0.5 * areaRect.width + 'px';
        areaStyleObj.top = 0.5 * targetRect.height + 'px';
        arrowStyleObj.left = 0.5 * (areaRect.width - arrowRect.width) + 'px';
        break;
      case 'left':
        areaStyleObj.right = 0.5 * targetRect.width + 'px';
        areaStyleObj.top = -0.5 * areaRect.height + 'px';
        arrowStyleObj.top = 0.5 * (areaRect.height - arrowRect.height) + 'px';
        break;
      default:
        break;
    }
    setStyles(this.areaElement, areaStyleObj);
    setStyles(this.arrowElement, arrowStyleObj);

    this.areaElement.addEventListener('mouseenter', () => this.mouseEnter());
    this.areaElement.addEventListener('mouseleave', () => this.mouseLeave());
    this.rendered = true;
  }

  public dismiss() {
    this.rendered = false;
    this.areaElement.removeEventListener('mouseenter', () => this.mouseEnter());
    this.areaElement.removeEventListener('mouseleave', () => this.mouseLeave());
    removeElement(this.element);
  }

  public mouseEnter() {
    if (!this.rendered) this.render();
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
  }

  public mouseLeave() {
    this.timeoutId = window.setTimeout(() => {
      this.dismiss();
    }, 200);
  }
}
