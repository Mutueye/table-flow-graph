import { TableFlowGraph } from '..';
import { createClassElement } from '../lib/dom';
import { Bearing } from '../types';

/**
 * Anchor point for drawing lines
 */
export default class TFGraphAnchor {
  public element: HTMLElement;
  public bearing: Bearing;
  public tr: HTMLElement;
  public col: HTMLElement;
  public offsetX: boolean;
  public offsetY: boolean;
  public id: string = '';
  public posX: number = 0;
  public posY: number = 0;
  public hidden: boolean = false;

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
      // create dom elements
      this.element = createClassElement('div', 'tfgraph-anchor', graphInstance.anchorsLayer);
      createClassElement('div', 'tfgraph-anchor-point', this.element);

      // set TFGraphAnchor instance id
      this.id = `anchor_${row}_${column}_${bearing}_${offsetX ? 'offsetx' : 'normalx'}_${
        offsetY ? 'offsety' : 'normaly'
      }`;
      // set dom id
      this.element.setAttribute('id', `${graphInstance.id}_${this.id}`);

      graphInstance.anchors.push(this);
      setTimeout(() => this.setPosition(), 1);
      // this.setPosition();
    }
  }

  setOnePosition(x, y) {
    this.posX = x;
    this.posY = y;
    this.element.style.left = x + 'px';
    this.element.style.top = y + 'px';
    this.element.setAttribute('title', `xpos & ypos=${x},${y}`);
  }

  public setVisible(visible: boolean) {
    if (visible) {
      this.element.classList.remove('hidden');
    } else {
      this.element.classList.add('hidden');
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
        this.setOnePosition(x_left, y_top);
        break;
      case 'top':
        this.setOnePosition(x_center, y_top);
        break;
      case 'topright':
        this.setOnePosition(x_right, y_top);
        break;
      case 'right':
        this.setOnePosition(x_right, y_center);
        break;
      case 'bottomright':
        this.setOnePosition(x_right, y_bottom);
        break;
      case 'bottom':
        this.setOnePosition(x_center, y_bottom);
        break;
      case 'bottomleft':
        this.setOnePosition(x_left, y_bottom);
        break;
      case 'left':
        this.setOnePosition(x_left, y_center);
        break;
      case 'center':
        this.setOnePosition(x_center, y_center);
        break;
      default:
        break;
    }
  }
}
