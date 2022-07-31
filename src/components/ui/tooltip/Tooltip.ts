import { createClassElement, removeElement, setStyles } from '../../../lib/dom';
import { TooltipOptoins } from '../../../types';

/**
 * table-flow-graph popup
 */
export default class Tooltip {
  targetElement: HTMLElement;
  options: TooltipOptoins;
  public element: HTMLElement;
  public areaElement: HTMLElement;
  public boxElement: HTMLElement;
  public arrowElement: HTMLElement;
  public disabled: boolean;
  public rendered: boolean;
  public dismissTimeoutId: number | null;
  public showTimeoutId: number | null;

  constructor(targetElement: HTMLElement, options: TooltipOptoins) {
    this.targetElement = targetElement;
    this.options = options;
    this.rendered = false;
    this.targetElement.addEventListener('mouseenter', () => this.mouseEnter());
    this.targetElement.addEventListener('mouseleave', () => this.mouseLeave());
  }

  public render() {
    const { placement = 'top', label } = this.options;

    const targetRect = this.targetElement.getBoundingClientRect();
    this.element = createClassElement('div', 'tfgraph-tooltip', document.body);
    setStyles(this.element, {
      left: targetRect.left + 0.5 * targetRect.width + 'px',
      top: targetRect.top + 0.5 * targetRect.height + 'px',
    });

    this.areaElement = createClassElement('div', `tfgraph-tooltip-area ${placement}`, this.element);
    this.boxElement = createClassElement('div', 'tfgraph-tooltip-box', this.areaElement);
    this.arrowElement = createClassElement('div', 'tfgraph-tooltip-arrow', this.areaElement);
    if (label) this.boxElement.innerHTML = label;

    const areaRect = this.areaElement.getBoundingClientRect();
    const arrowRect = this.arrowElement.getBoundingClientRect();
    const areaStyleObj: Partial<CSSStyleDeclaration> = {};
    const arrowStyleObj: Partial<CSSStyleDeclaration> = {};
    switch (placement) {
      case 'top':
        areaStyleObj.left = -0.5 * areaRect.width + 'px';
        areaStyleObj.bottom = 0.5 * targetRect.height + 10 + 'px';
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

    this.rendered = true;
    if (this.showTimeoutId) {
      window.clearTimeout(this.showTimeoutId);
      this.showTimeoutId = null;
    }
  }

  public dismiss() {
    this.rendered = false;
    this.targetElement.removeEventListener('mouseenter', () => this.mouseEnter());
    this.targetElement.removeEventListener('mouseleave', () => this.mouseLeave());
    if (this.element) removeElement(this.element);
  }

  public mouseEnter() {
    if (!this.rendered && !this.showTimeoutId) {
      this.showTimeoutId = window.setTimeout(() => {
        this.render();
      }, 500);
    }
    if (this.dismissTimeoutId) {
      window.clearTimeout(this.dismissTimeoutId);
    }
  }

  public mouseLeave() {
    if (this.showTimeoutId) {
      window.clearTimeout(this.showTimeoutId);
      this.showTimeoutId = null;
    }
    this.dismissTimeoutId = window.setTimeout(() => {
      this.dismiss();
    }, 50);
  }
}
