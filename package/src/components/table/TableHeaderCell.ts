import { TableFlowGraph, TFGraphColumn } from '../../index';
import { createClassElement } from '../../lib/dom';
import Button from '../ui/button/Button';
import Popup from '../ui/popup/Popup';
// import TableHeaderCellMenu from './TableHeaderCellMenu';
import EditColumnDialog from './EditColumnDialog';

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
  public editColDialog: EditColumnDialog;

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
    if (this.columnData.title) {
      el.innerHTML = this.columnData.title;
    } else {
      el.classList.add('empty');
    }
    if (this.columnData.width) {
      // TODO load width value from options
      let width = this.columnData.width;
      switch (this.columnData.width) {
        case 'lg':
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
    this.controlLayer = createClassElement(
      'div',
      'tfgraph-cell-control-layer hidden',
      this.element,
    );
    this.editColDialog = new EditColumnDialog(this.graphInstance, this);
    new Button(this.controlLayer, {
      icon: 'edit',
      type: 'primary',
      className: 'absolute left-6 top-6 p-0 sm w-28 btn-tl',
      tooltip: this.graphInstance.options.labels.editColumn,
      onClick: () => {
        if (typeof this.graphInstance.options.editColumn === 'function') {
          this.graphInstance.options.editColumn(this.columnData);
        } else {
          this.editColDialog.show();
        }
      },
    });
    if (this.isLast && this.graphInstance.tableController.canDeleteColumn) {
      new Button(this.controlLayer, {
        icon: 'delete_col',
        type: 'danger',
        className: 'absolute right-6 top-6 p-0 sm w-28 btn-tr',
        tooltip: this.graphInstance.options.labels.deleteColumn,
        onClick: () => {
          if (typeof this.graphInstance.options.deleteColumn === 'function') {
            // custom delete column method
            this.graphInstance.options.deleteColumn(this.columnData);
          } else {
            if (typeof this.graphInstance.options.onDeleteColumn === 'function') {
              // const targetColumn = this.graphInstance.options.columns[this.graphInstance.options.totalColumns - 1];
              this.graphInstance.options.onDeleteColumn(this.columnData);
            }
            this.graphInstance.options.columns.pop();
            this.graphInstance.refresh(Object.assign({}, this.graphInstance.options));
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
