import { TableFlowGraph, TFGraphColumn } from '../../index';
import { createClassElement } from '../../lib/dom';
import Button from '../ui/button/Button';
import Dialog from '../ui/dialog/Dialog';
import TableHeaderCell from './TableHeaderCell';

export default class EditColumnDialog {
  public dialog: Dialog | null;
  public targetHeaderCell: TableHeaderCell;
  public title: string;
  public graphInstance: TableFlowGraph;
  public contentElement: HTMLElement;
  public inputEl: HTMLInputElement;
  public btnConfirm: Button;
  public btnCancel: Button;
  public isEdit: boolean;

  constructor(graphInstance: TableFlowGraph, targetHeaderCell?: TableHeaderCell) {
    this.graphInstance = graphInstance;
    this.dialog = null;
    this.targetHeaderCell = targetHeaderCell;
    this.setIsEdit();
    this.renderContent();
  }

  setIsEdit() {
    if (this.targetHeaderCell) {
      this.title = this.targetHeaderCell.columnData.title;
      this.isEdit = true;
    } else {
      this.title = '';
      this.isEdit = false;
    }
    if (this.inputEl) this.inputEl.value = this.title;
  }

  renderContent() {
    this.contentElement = createClassElement('div', 'flex flex-col w-420 px-15 pb-15');
    this.inputEl = createClassElement('input', 'tfgraph-input', this.contentElement);
    this.inputEl.setAttribute('placeholder', this.graphInstance.options.labels.enterColumnName);
    const btnContainer = createClassElement(
      'div',
      'flex flex-row items-center justify-end mt-15',
      this.contentElement,
    );
    this.btnCancel = new Button(btnContainer, {
      label: this.graphInstance.options.labels.cancel,
      type: 'default',
      className: 'mr-10',
      onClick: () => {
        this.dialog.close();
      },
    });
    this.btnConfirm = new Button(btnContainer, {
      label: this.graphInstance.options.labels.confirm,
      type: 'primary',
      onClick: () => {
        if (this.inputEl.value) {
          if (this.title !== this.inputEl.value) {
            if (this.isEdit) {
              this.targetHeaderCell.columnData.title = this.inputEl.value;
              this.dialog.close();
              this.graphInstance.refresh();
              if (typeof this.graphInstance.options.onEditColumn === 'function') {
                this.graphInstance.options.onEditColumn(this.targetHeaderCell.columnData);
              }
            } else {
              const colData: TFGraphColumn = {
                id: `header_col_${this.graphInstance.options.totalColumns}`,
                title: this.inputEl.value,
              };
              this.graphInstance.options.columns.push(colData);
              this.dialog.close();
              this.graphInstance.refresh();
              if (typeof this.graphInstance.options.onAddColumn === 'function') {
                this.graphInstance.options.onAddColumn(colData);
              }
            }
          } else {
            this.dialog.close();
          }
        }
      },
    });
  }

  public show() {
    this.setIsEdit();
    this.dialog = new Dialog({
      title: this.isEdit
        ? this.graphInstance.options.labels.editColumn
        : this.graphInstance.options.labels.addColumn,
      contentElement: this.contentElement,
    });
  }
}
