import { createClassElement } from '../../../lib/dom';
import { BtnOptions } from '../../../index';
import { Icon } from '../icon/Icon';
import Tooltip from '../tooltip/Tooltip';

/**
 * table-flow-graph button
 */
export default class Button {
  public element: HTMLElement;
  public disabled: boolean;
  public btnToolTip: Tooltip;

  constructor(parentElement: HTMLElement, options: BtnOptions) {
    const { label, type, onClick, icon, tooltip } = options;
    let className = 'tfgraph-button is-hoverable';
    if (options.className) className += ' ' + options.className;
    className += ' ' + (type ? type : 'default');
    this.element = createClassElement('button', className, parentElement);
    if (icon) new Icon(this.element, { name: icon, size: 16, className: label ? 'mr-5' : '' });
    if (label) {
      createClassElement('span', '', this.element).innerHTML = label;
    }
    if (tooltip) this.btnToolTip = new Tooltip(this.element, { label: tooltip });

    this.element.addEventListener('click', (e) => {
      if (this.btnToolTip) this.btnToolTip.dismiss();
      if (this.disabled) return;
      if (typeof onClick === 'function') {
        onClick(e);
      }
    });
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
