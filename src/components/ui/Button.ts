import { createClassElement } from '../../lib/dom';
import { BtnOptions } from '../../types';
import { Icon } from './Icon';

/**
 * table-flow-graph button
 */
export default class Button {
  public element: HTMLElement;
  public disabled: boolean;

  constructor(parentElement: HTMLElement, options: BtnOptions) {
    const { label, type, onClick, icon } = options;
    let className = 'tfgraph-button is-hoverable';
    let iconClassName = '';
    if (options.className) className += ' ' + options.className;
    switch (type) {
      case 'primary':
        className += ' bg-blue border-blue';
        iconClassName += ' fill-white';
        break;
      case 'warning':
        className += ' bg-yellow border-yellow';
        iconClassName += ' fill-white';
        break;
      case 'danger':
        className += ' bg-red border-red';
        iconClassName += ' fill-white';
        break;
      case 'success':
        className += ' bg-green border-green';
        iconClassName += ' fill-white';
        break;
      case 'clean':
        className += ' clean';
        iconClassName += ' fill-gray-33';
        break;
      case 'default':
        className += ' default';
        iconClassName += ' fill-gray-33';
        break;
      default:
        className += ' default';
        iconClassName += ' fill-gray-33';
        break;
    }
    this.element = createClassElement('button', className, parentElement);
    if (icon) new Icon(this.element, { name: icon, size: 16, className: iconClassName + ' mr-5' });
    createClassElement('span', '', this.element).innerHTML = label;
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
