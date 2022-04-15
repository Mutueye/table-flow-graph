import { TableFlowGraph } from '..';
import { createClassElement } from '../lib/dom';
import { Bearing } from '../types';

export default class TFGraphAnchor {
  public element: HTMLElement;
  public bearing: Bearing;
  public tr: HTMLElement;
  public col: HTMLElement;
  public offsetX: boolean;
  public offsetY: boolean;

  constructor(
    bearing: Bearing,
    row: number,
    column: number,
    graphInstance: TableFlowGraph,
    offsetX: boolean = false,
    offsetY: boolean = false,
  ) {
    this.bearing = bearing;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.tr = document.getElementById(`${graphInstance.id}_tr_${row}`);
    this.col = document.getElementById(`${graphInstance.id}_col_${column}`);
    if (this.tr && this.col) {
      this.element = createClassElement('div', 'tfgraph-anchor', graphInstance.anchorsLayer);
      createClassElement('div', 'tfgraph-anchor-point', this.element);
      this.element.setAttribute(
        'id',
        `${graphInstance.id}_anchor_${row}_${column}_${bearing}_${
          offsetX ? 'offsetx' : 'normalx'
        }_${offsetY ? 'offsety' : 'normaly'}`,
      );
      graphInstance.anchors.push(this);
      setTimeout(() => {
        this.setPosition();
      }, 1);
    }
  }

  public setPosition() {
    const x_left = this.col.offsetLeft + (this.offsetX ? 15 : 0);
    const x_center = this.col.offsetLeft + 0.5 * this.col.offsetWidth;
    const x_right = this.col.offsetLeft + this.col.offsetWidth - (this.offsetX ? 15 : 0);
    const y_top = this.tr.offsetTop + (this.offsetY ? 15 : 0);
    const y_center = this.tr.offsetTop + 0.5 * this.tr.offsetHeight;
    const y_bottom = this.tr.offsetTop + this.tr.offsetHeight - (this.offsetY ? 15 : 0);

    switch (this.bearing) {
      case 'topleft':
        this.element.style.left = x_left + 'px';
        this.element.style.top = y_top + 'px';
        break;
      case 'top':
        this.element.style.left = x_center + 'px';
        this.element.style.top = y_top + 'px';
        break;
      case 'topright':
        this.element.style.left = x_right + 'px';
        this.element.style.top = y_top + 'px';
        break;
      case 'right':
        this.element.style.left = x_right + 'px';
        this.element.style.top = y_center + 'px';
        break;
      case 'bottomright':
        this.element.style.left = x_right + 'px';
        this.element.style.top = y_bottom + 'px';
        break;
      case 'bottom':
        this.element.style.left = x_center + 'px';
        this.element.style.top = y_bottom + 'px';
        break;
      case 'bottomleft':
        this.element.style.left = x_left + 'px';
        this.element.style.top = y_bottom + 'px';
        break;
      case 'left':
        this.element.style.left = x_left + 'px';
        this.element.style.top = y_center + 'px';
        break;
      case 'center':
        this.element.style.left = x_center + 'px';
        this.element.style.top = y_center + 'px';
        break;
      default:
        break;
    }
  }
}
