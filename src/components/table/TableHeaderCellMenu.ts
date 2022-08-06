import { TableFlowGraph } from '../../index';
import { createClassElement } from '../../lib/dom';
import { HeaderCellMenuOptions } from '../../types';
import Button from '../ui/button/Button';
import TableHeaderCell from './TableHeaderCell';

/**
 * table-flow-graph tabel header cell menu
 * !!Deprecated
 */
export default class TableHeaderCellMenu {
  graphInstance: TableFlowGraph;
  options: HeaderCellMenuOptions;
  public element: HTMLElement;
  public headerCell: TableHeaderCell;

  constructor(headerCell: TableHeaderCell, options: HeaderCellMenuOptions) {
    this.headerCell = headerCell;
    this.graphInstance = this.headerCell.graphInstance;
    this.options = options;
    this.element = createClassElement('div', 'flex flex-row py-10 px-5');
    this.createBtns(this.element);
  }

  createBtns(parentElement: HTMLElement) {
    new Button(parentElement, {
      icon: 'edit',
      label: this.graphInstance.options.labels.editColumn,
      type: 'primary',
      className: 'mx-5 sm',
      onClick: () => {
        if (typeof this.graphInstance.options.onEditColumn === 'function') {
          this.graphInstance.options.onEditColumn(this.headerCell.columnData);
        }
        this.headerCell.popMenu.dismiss();
      },
    });
    if (this.options.showDelete) {
      new Button(parentElement, {
        icon: 'x',
        label: this.graphInstance.options.labels.deleteColumn,
        type: 'danger',
        className: 'mx-5 sm',
        onClick: () => {
          // this.graphInstance.options.columns.pop();
          // this.graphInstance.init(this.graphInstance.options);
          if (typeof this.graphInstance.options.onDeleteColumn === 'function') {
            this.graphInstance.options.onDeleteColumn(this.headerCell.columnData);
          }
          this.headerCell.popMenu.dismiss();
        },
      });
    }
  }
}
