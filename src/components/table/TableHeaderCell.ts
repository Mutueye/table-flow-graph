import { TableFlowGraph } from '../../index';
import { createClassElement } from '../../lib/dom';
import { TFGraphColumn } from '../../types';
import Button from '../ui/button/Button';
import Popup from '../ui/popup/Popup';
// import TableHeaderCellMenu from './TableHeaderCellMenu';

/**
 * table-flow-graph tabel header cell
 */
export default class TableHeaderCell {
  public graphInstance: TableFlowGraph;
  public element: HTMLElement;
  public columnIndex: number;
  public isLast: boolean;
  public columnData: TFGraphColumn;
  public canDelete: boolean;
  public canAdd: boolean;
  public popMenu: Popup | null;
  // public menu: TableHeaderCellMenu | null;
  public controlLayer: HTMLElement;

  constructor(
    parentElement: HTMLElement,
    columnData: TFGraphColumn,
    columnIndex: number,
    graphInstance: TableFlowGraph,
  ) {
    this.graphInstance = graphInstance;
    this.columnIndex = columnIndex;
    this.columnData = columnData;
    this.isLast = this.columnIndex === this.graphInstance.options.totalColumns - 1;
    this.element = this.createElement(parentElement);
  }

  createElement(parentElement: HTMLElement): HTMLElement {
    const el = createClassElement('th', 'tfgraph-th', parentElement);
    el.innerHTML = this.columnData.title;
    if (this.columnData.width) {
      // TODO load width value from options
      let width = this.columnData.width;
      switch (this.columnData.width) {
        case 'large':
          width = '200';
          break;
        case 'md':
          width = '170';
          break;
        case 'sm':
          width = '130';
          break;
        case 'xs':
          width = '105';
          break;
        default:
          width = this.columnData.width;
          break;
      }
      el.setAttribute('width', width);
    } else {
      el.setAttribute('width', 'auto');
    }
    el.setAttribute('id', `${this.graphInstance.id}_col_${this.columnIndex}`);
    return el;
  }

  // header cell controls for edit mode
  public setEditControls() {
    // this.menu = new TableHeaderCellMenu(this, {
    //   showDelete: this.isLast && this.graphInstance.tableController.canDeleteColumn,
    //   // showAdd: this.isLast,
    // });
    // this.popMenu = new Popup(this.element, { placement: 'top', contentElement: this.menu.element });
    // this.element.addEventListener('mouseenter', () => {
    //   if (this.popMenu) {
    //     this.popMenu.mouseEnter();
    //   }
    // });
    // this.element.addEventListener('mouseleave', () => {
    //   if (this.popMenu) {
    //     this.popMenu.mouseLeave();
    //   }
    // });
    this.controlLayer = createClassElement(
      'div',
      'tfgraph-cell-control-layer hidden',
      this.element,
    );
    new Button(this.controlLayer, {
      icon: 'edit',
      type: 'primary',
      className: 'absolute left-6 top-6 p-0 sm w-28',
      tooltip: this.graphInstance.options.labels.editColumn,
      onClick: () => {
        if (typeof this.graphInstance.options.onEditColumn === 'function') {
          this.graphInstance.options.onEditColumn(this.columnData);
        }
      },
    });
    if (this.isLast && this.graphInstance.tableController.canDeleteColumn) {
      new Button(this.controlLayer, {
        icon: 'x',
        type: 'danger',
        className: 'absolute right-6 top-6 p-0 sm w-28',
        tooltip: this.graphInstance.options.labels.deleteColumn,
        onClick: () => {
          if (typeof this.graphInstance.options.onDeleteColumn === 'function') {
            this.graphInstance.options.onDeleteColumn(this.columnData);
          }
        },
      });
    }
    this.element.addEventListener('mouseenter', () => this.onMouseEnter());
    this.element.addEventListener('mouseleave', () => this.onMouseLeave());
  }

  onMouseEnter() {
    this.controlLayer.classList.remove('hidden');
  }

  onMouseLeave() {
    this.controlLayer.classList.add('hidden');
  }
}
