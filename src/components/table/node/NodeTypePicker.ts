import { NodeType } from '../../..';
import { NodeTypeList } from './nodeUtils';
import { NodeTypeBtn } from './NodeTypeBtn';
import { createClassElement } from '../../../lib/dom';

export interface NodeTypePickerOption {
  parentEl: HTMLElement;
  initialType: NodeType;
  onChange: (type: NodeType) => void;
}

export default class NodeTypePicker {
  public currentType: NodeType;
  public element: HTMLElement;
  private option: NodeTypePickerOption;
  private btnList: NodeTypeBtn[];

  constructor(option: NodeTypePickerOption) {
    this.option = option;
    this.currentType = this.option.initialType;
    this.element = createClassElement('div', 'flex flex-row items-center', this.option.parentEl);
    this.btnList = [];
    NodeTypeList.forEach((type) => {
      const btn = new NodeTypeBtn({
        parentEl: this.element,
        type,
        onClick: (t) => this.clickType(t),
      });
      if (this.currentType === type) btn.toggleActive(true);
      this.btnList.push(btn);
    });
  }

  private clickType(t: NodeType) {
    if (this.currentType !== t) {
      this.currentType = t;
      this.setActiveType();
      if (typeof this.option.onChange === 'function') this.option.onChange(t);
    }
  }

  setActiveType() {
    this.btnList.forEach((btn) => {
      if (this.currentType === btn.type) {
        if (!btn.active) btn.toggleActive(true);
      } else if (btn.active) {
        btn.toggleActive(false);
      }
    });
  }
}
