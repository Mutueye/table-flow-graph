import { TableFlowGraph } from '../../index';
import { createClassElement } from '../../lib/dom';
import { Bearing } from '../../types';

// | 'topleft'
// | 'top'
// | 'topright'
// | 'left'
// | 'center'
// | 'right'
// | 'bottomleft'
// | 'bottom'
// | 'bottomright';

const getBearingShort = (bearing: Bearing) => {
  let shortBearing = 't';
  switch (bearing) {
    case 'topleft':
      shortBearing = 'tl';
      break;
    case 'top':
      shortBearing = 't';
      break;
    case 'topright':
      shortBearing = 'tr';
      break;
    case 'left':
      shortBearing = 'l';
      break;
    case 'center':
      shortBearing = 'c';
      break;
    case 'right':
      shortBearing = 'r';
      break;
    case 'bottomleft':
      shortBearing = 'bl';
      break;
    case 'bottom':
      shortBearing = 'b';
      break;
    case 'bottomright':
      shortBearing = 'br';
      break;
    default:
      break;
  }
  return shortBearing;
};

/**
 * Anchor point for drawing lines
 */
export default class Anchor {
  // element of this Anchor
  public element: HTMLElement;
  // the bearing relative to this anchor's parent table cell
  public bearing: Bearing;
  public elementTr: HTMLElement;
  public elementCol: HTMLElement;
  // is the anchor on table cell border or on inner block border(top / bottom)
  public isOffsetX: boolean;
  // is the anchor on table cell border or on inner block border(left / right)
  public isOffsetY: boolean;
  // id for this Anchor class
  public id = '';
  // x position relative to table area
  public posX = 0;
  // y position relative to table area
  public posY = 0;
  public row: number;
  public column: number;
  public hidden = false;

  constructor(
    bearing: Bearing,
    row: number,
    column: number,
    graphInstance: TableFlowGraph,
    isOffsetX = false,
    isOffsetY = false,
  ) {
    this.bearing = bearing;
    this.isOffsetX = isOffsetX;
    this.isOffsetY = isOffsetY;
    this.row = row;
    this.column = column;
    this.elementTr = document.getElementById(`${graphInstance.id}_tr_${row}`);
    this.elementCol = document.getElementById(`${graphInstance.id}_col_${column}`);
    if (this.elementTr && this.elementCol) {
      // create dom elements
      this.element = createClassElement(
        'div',
        'tfgraph-anchor',
        graphInstance.anchorController.element,
      );
      createClassElement('div', 'tfgraph-anchor-point', this.element);
      const area = createClassElement('div', 'tfgraph-anchor-area', this.element);
      createClassElement('div', 'tfgraph-anchor-circle', area);

      // set Anchor instance id; 'ox' meaning offsetX, 'nx' meaning normalX
      this.id = `a_${row}_${column}_${getBearingShort(bearing)}_${isOffsetX ? 'ox' : 'nx'}_${
        isOffsetY ? 'oy' : 'ny'
      }`;
      // set dom id
      this.element.setAttribute('id', `${graphInstance.id}_${this.id}`);

      graphInstance.anchorController.anchors.push(this);
      this.setVisible(graphInstance.mode === 'edit');
      // setTimeout(() => this.setPosition(), 1);
      this.setPosition();
      this.element.addEventListener('click', () => {
        if (!graphInstance.lineController.isDrawingLine) {
          graphInstance.lineController.createLineGroup(this.id);
        } else {
          graphInstance.lineController.addLineSegment(this.id);
        }
      });
      this.element.addEventListener('mouseenter', () => {
        graphInstance.anchorController.setHoveredAnchor(this);
      });
      this.element.addEventListener('mouseleave', () => {
        if (graphInstance.anchorController.hoveredAnchor.id === this.id) {
          graphInstance.anchorController.setHoveredAnchor(null);
        }
      });
      // dblclick to finish drawing lines
      this.element.addEventListener('dblclick', () => {
        if (graphInstance.lineController.isDrawingLine) {
          graphInstance.lineController.endDrawLine();
        }
      });
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
    const x_left = this.elementCol.offsetLeft + (this.isOffsetX ? 15 : 0);
    const x_center = this.elementCol.offsetLeft + 0.5 * this.elementCol.offsetWidth;
    const x_right =
      this.elementCol.offsetLeft + this.elementCol.offsetWidth - (this.isOffsetX ? 15 : 0);
    const y_top = this.elementTr.offsetTop + (this.isOffsetY ? 15 : 0);
    const y_center = this.elementTr.offsetTop + 0.5 * this.elementTr.offsetHeight;
    const y_bottom =
      this.elementTr.offsetTop + this.elementTr.offsetHeight - (this.isOffsetY ? 15 : 0);

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
