import { createClassElement } from '../../lib/dom';
import { BtnOptions } from '../../types';

/**
 * table-flow-graph button
 */
export default class Button {
  public element: HTMLElement;
  public disabled: boolean;

  constructor(parentElement: HTMLElement, options: BtnOptions) {
    const { label, type, onClick } = options;
    let className = 'tfgraph-button is-hoverable';
    switch (type) {
      case 'primary':
        className += ' bg-blue border-blue';
        break;
      case 'warning':
        className += ' bg-yellow border-yellow';
        break;
      case 'danger':
        className += ' bg-red border-red';
        break;
      case 'success':
        className += ' bg-green border-green';
        break;
      case 'clean':
        className += ' clean';
        break;
      case 'default':
        className += ' default';
        break;
      default:
        className += ' default';
        break;
    }
    this.element = createClassElement('button', className, parentElement);
    this.element.innerHTML = label;
    if (typeof onClick === 'function') {
      this.element.addEventListener('click', onClick);
    }
  }

  setDisabled() {
    this.disabled = true;
    this.element.classList.add('disabled');
  }

  setEnabled() {
    this.disabled = false;
    this.element.classList.remove('disabled');
  }
}
