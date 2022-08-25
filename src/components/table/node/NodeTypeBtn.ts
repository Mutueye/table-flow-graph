import { NodeType } from '../../..';
import { createClassElement, setStyles } from '../../../lib/dom';
import { Icon } from '../../ui/icon/Icon';
import { NodeStyle } from './nodeUtils';

const btnStyle = {
  border: '2px solid transparent',
  padding: '2px',
  margin: '5px',
};

export interface NodeTypeBtnOption {
  parentEl: HTMLElement;
  type: NodeType;
  onClick: (type: NodeType) => void;
}

export class NodeTypeBtn {
  public element: HTMLElement;
  public type: NodeType;
  public active: boolean;
  private nodeEl: HTMLElement;
  private icon: Icon;
  private hovered: boolean;
  private option: NodeTypeBtnOption;

  constructor(option: NodeTypeBtnOption) {
    this.option = option;
    this.type = this.option.type;
    this.hovered = false;
    this.createNodeTypeBtn();
  }

  private createNodeTypeBtn() {
    this.element = createClassElement('div', 'm5', this.option.parentEl);
    setStyles(this.element, btnStyle);
    this.nodeEl = createClassElement('div', 'w-12 h-12', this.element);
    setStyles(this.nodeEl, {
      ...NodeStyle[this.type].normalStyle,
      borderWidth: '1px',
      borderStyle: 'solid',
    });
    this.icon = new Icon(this.nodeEl, {
      name: 'check',
      size: 10,
      color: '#FFFFFF',
      className: this.active ? '' : 'hidden',
    });
    this.element.addEventListener('click', () => {
      if (typeof this.option.onClick === 'function') this.option.onClick(this.type);
    });
    this.element.addEventListener('mouseenter', () => this.toggleHover(true));
    this.element.addEventListener('mouseleave', () => this.toggleHover(false));
  }

  private toggleHover(hovered: boolean) {
    this.hovered = hovered;
    if (this.hovered) {
      setStyles(this.element, { borderColor: NodeStyle[this.type].hoverStyle.borderColor });
      // setStyles(this.nodeEl, NodeStyle[this.type].hoverStyle);
    } else {
      if (!this.active) {
        setStyles(this.element, { borderColor: 'transparent' });
        // setStyles(this.nodeEl, NodeStyle[this.type].normalStyle);
      }
    }
  }

  public toggleActive(active: boolean) {
    this.active = active;
    if (this.active) {
      this.icon.element.classList.remove('hidden');
      setStyles(this.element, { borderColor: NodeStyle[this.type].hoverStyle.borderColor });
      setStyles(this.nodeEl, NodeStyle[this.type].hoverStyle);
    } else {
      this.icon.element.classList.add('hidden');
      if (!this.hovered) {
        setStyles(this.element, { borderColor: 'transparent' });
        setStyles(this.nodeEl, NodeStyle[this.type].normalStyle);
      }
    }
  }
}
