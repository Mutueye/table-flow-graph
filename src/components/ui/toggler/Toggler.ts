import { createClassElement, setStyles } from '../../../lib/dom';
import { TogglerOptions, TogglerButton } from '../../../types';

/**
 * table-flow-graph toggler btn group
 */
export default class Toggler {
  public element: HTMLElement;
  public indicatorEl: HTMLElement;
  public btnContainerEl: HTMLElement;
  public disabled: boolean;
  public activeIndex: number;
  public btnList: TogglerButton[] = [];

  constructor(parentElement: HTMLElement, options: TogglerOptions) {
    const { items, initialActiveIndex, onChange } = options;
    this.element = createClassElement('div', 'tfgraph-toggler', parentElement);
    this.indicatorEl = createClassElement('div', 'tfgraph-toggler-indicator', this.element);
    this.btnContainerEl = createClassElement('div', 'flex flex-row items-center', this.element);
    items.forEach((item, index) => {
      const el = createClassElement('button', 'tfgraph-toggler-btn', this.btnContainerEl);
      el.innerHTML = item.label;
      this.btnList.push({ itemData: item, el, index });
      el.addEventListener('click', () => {
        this.setActive(index);
        if (typeof onChange === 'function') onChange(item, index);
      });
    });
    this.setActive(typeof initialActiveIndex === 'number' ? initialActiveIndex : 0);
  }

  setActive(index: number) {
    if (this.activeIndex !== index) {
      if (typeof this.activeIndex === 'number') {
        this.btnList[this.activeIndex].el.classList.remove('active');
      }
      this.activeIndex = index;
      this.btnList[index].el.classList.add('active');
      this.setActiveIndicator();
    }
  }

  setActiveIndicator() {
    const containerRect = this.btnContainerEl.getBoundingClientRect();
    const rect = this.btnList[this.activeIndex].el.getBoundingClientRect();
    console.log('rect.left::::containerRect.left::::::', rect.left, containerRect.left);
    setStyles(this.indicatorEl, {
      width: rect.width + 'px',
      // this.activeIndex === 0 || this.activeIndex === this.btnList.length - 1
      //   ? rect.width - 2 + 'px'
      //   : rect.width + 4 + 'px',
      left: rect.left - containerRect.left + 4 + 'px',
      // this.activeIndex === 0
      //   ? rect.left - containerRect.left + 4 + 'px'
      //   : rect.left - containerRect.left - 2 + 'px',
    });
    // this.indicatorEl.style.width = rect.width + 2 + 'px';
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
