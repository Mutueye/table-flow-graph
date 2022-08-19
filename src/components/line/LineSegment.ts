// import { TableFlowGraph } from '../index';
import { createClassElement, removeElement } from '../../lib/dom';
import { LineOptions, Position } from '../../index';
import LineGroup from './LineGroup';

/**
 * table-flow-graph line
 */
export default class LineSegment {
  public element: HTMLElement;
  public thickness: number;
  public startPointEl: HTMLElement;
  public endArrowEl: HTMLElement;

  constructor(parent: LineGroup, options: LineOptions) {
    this.element = createClassElement('div', 'tfgraph-line', parent.element);
    const { positionA, positionB, thickness = 2, isStart = true, isEnd = true } = options;
    this.thickness = thickness;
    if (isStart) this.toggleStartPoint();
    if (isEnd) this.toggleEndArrow();
    this.drawLine(positionA, positionB);
    this.element.addEventListener('mouseenter', () => parent.setHovered(true));
    this.element.addEventListener('mouseleave', () => parent.setHovered(false));
    this.element.addEventListener('dblclick', () => parent.onDoubleClick());
  }

  public setHoverd(hovered = true) {
    if (hovered) {
      this.element.classList.add('hovered');
    } else {
      this.element.classList.remove('hovered');
    }
  }

  public drawLine(positionA: Position, positionB: Position) {
    // start point
    const x1 = positionA.x;
    const y1 = positionA.y;
    // end point
    const x2 = positionB.x;
    const y2 = positionB.y;

    // distance
    const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

    // center
    const cx = (x1 + x2) / 2 - length / 2;
    const cy = (y1 + y2) / 2 - this.thickness / 2;
    // angle
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    this.element.style.width = length + this.thickness + 'px';
    this.element.style.height = this.thickness + 'px';
    this.element.style.left = cx - 0.5 * this.thickness + 'px';
    this.element.style.top = cy + 'px';
    this.element.style.borderRadius = this.thickness + 'px';
    this.element.style.transform = `rotate(${angle}deg)`;
  }

  public toggleStartPoint() {
    if (this.startPointEl) {
      removeElement(this.startPointEl);
    } else {
      this.startPointEl = createClassElement('div', 'start-point', this.element);
    }
  }

  public toggleEndArrow() {
    if (this.endArrowEl) {
      removeElement(this.endArrowEl);
    } else {
      this.endArrowEl = createClassElement('div', 'arrow', this.element);
    }
  }
}
