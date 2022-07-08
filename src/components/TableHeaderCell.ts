import { TableFlowGraph } from '../index';
import { createClassElement } from '../lib/dom';
import { TFGraphColumn } from '../types';
import Popup from './ui/Popup';
import TableHeaderCellMenu from './TableHeaderCellMenu';

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
  public menu: TableHeaderCellMenu | null;

  constructor(
    parentElement: HTMLElement,
    columnData: TFGraphColumn,
    columnIndex: number,
    graphInstance: TableFlowGraph,
  ) {
    this.graphInstance = graphInstance;
    this.columnIndex = columnIndex;
    this.columnData = columnData;
    this.isLast = this.columnIndex === this.graphInstance.options.columns.length - 1;
    this.element = this.createElement(parentElement);
    this.menu = new TableHeaderCellMenu(this, { showDelete: this.isLast, showAdd: this.isLast });
    this.popMenu = new Popup(this.element, { placement: 'top', contentElement: this.menu.element });
    this.element.addEventListener('mouseenter', () => {
      if (this.popMenu) {
        this.popMenu.mouseEnter();
      }
    });
    this.element.addEventListener('mouseleave', () => {
      if (this.popMenu) {
        this.popMenu.mouseLeave();
      }
    });
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
}
