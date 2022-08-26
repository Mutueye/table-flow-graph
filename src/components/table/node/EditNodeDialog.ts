import { NodeType, TableFlowGraph, TFGraphNode } from '../../../index';
import { createClassElement } from '../../../lib/dom';
import Button from '../../ui/button/Button';
import Dialog from '../../ui/dialog/Dialog';
import NodeTypePicker from './NodeTypePicker';
import TableCell from '../TableCell';

export default class EditNodeDialog {
  public dialog: Dialog | null;
  public targetCell: TableCell;
  public title: string;
  public graphInstance: TableFlowGraph;
  public contentElement: HTMLElement;
  public nodeNameInput: HTMLInputElement;
  public btnConfirm: Button;
  public btnCancel: Button;
  public isEdit: boolean;
  public type: NodeType;
  public initialType: NodeType;

  constructor(graphInstance: TableFlowGraph, targetCell: TableCell) {
    this.graphInstance = graphInstance;
    this.targetCell = targetCell;
    this.dialog = null;
    this.type =
      this.targetCell.nodeData && this.targetCell.nodeData.type
        ? this.targetCell.nodeData.type
        : 'default';
    this.initialType = this.type;
    if (targetCell.nodeData) {
      this.title = targetCell.nodeData.title;
      this.isEdit = true;
    } else {
      this.title = '';
      this.isEdit = false;
    }
    this.renderContent();
  }

  setIsEdit() {
    if (this.targetCell.nodeData) {
      this.title = this.targetCell.nodeData.title;
      this.isEdit = true;
    } else {
      this.title = '';
      this.isEdit = false;
    }
    if (this.nodeNameInput) this.nodeNameInput.value = this.title;
  }

  renderContent() {
    this.contentElement = createClassElement('div', 'flex flex-col w-420 px-15 pb-15');
    this.nodeNameInput = createClassElement('input', 'tfgraph-input mb-20', this.contentElement);
    this.nodeNameInput.setAttribute('placeholder', this.graphInstance.options.labels.enterNodeName);
    new NodeTypePicker({
      parentEl: this.contentElement,
      initialType: this.type,
      onChange: (type) => {
        this.type = type;
      },
    });
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
        if (this.nodeNameInput.value) {
          if (this.title !== this.nodeNameInput.value || this.initialType !== this.type) {
            if (this.isEdit) {
              this.targetCell.nodeData.title = this.nodeNameInput.value;
              this.targetCell.nodeData.type = this.type;
              this.dialog.close();
              this.graphInstance.refresh();
              if (typeof this.graphInstance.options.onEditNode === 'function') {
                this.graphInstance.options.onEditNode(this.targetCell.nodeData);
              }
            } else {
              const nodeData: TFGraphNode = {
                id: `node_${this.targetCell.row}_${this.targetCell.column}`,
                row: this.targetCell.row,
                column: this.targetCell.column,
                rowSpan: 1,
                colSpan: 1,
                title: this.nodeNameInput.value,
                type: this.type,
              };
              this.graphInstance.options.nodes.push(nodeData);
              this.dialog.close();
              this.graphInstance.refresh();
              if (typeof this.graphInstance.options.onAddNode === 'function') {
                this.graphInstance.options.onAddNode(nodeData);
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
        ? this.graphInstance.options.labels.editNode
        : this.graphInstance.options.labels.addNode,
      contentElement: this.contentElement,
    });
  }
}
