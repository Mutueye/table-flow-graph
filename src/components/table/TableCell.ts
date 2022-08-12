import { TableFlowGraph } from '../../index';
import { createClassElement } from '../../lib/dom';
import { TFGraphNode } from '../../types';
import Button from '../ui/button/Button';
import Popup from '../ui/popup/Popup';
import EditNodeDialog from './EditNodeDialog';
// import Dialog from '../ui/dialog/Dialog';

/**
 * table-flow-graph tabel cell
 */
export default class TableCell {
  public graphInstance: TableFlowGraph;
  public element: HTMLElement;
  public nodeEl: HTMLElement;
  public controlLayer: HTMLElement;
  public popup: Popup;
  public nodeData?: TFGraphNode;
  public hasNode: boolean;
  public row: number;
  public column: number;
  public rowSpan: number;
  public colSpan: number;
  public isTarget: boolean; // is moving or resizing this cell
  public deleteRowBtn: Button;
  public deleteColBtn: Button;
  public editDialog: EditNodeDialog | null;

  constructor(
    parentElement: HTMLElement,
    data: TFGraphNode | null,
    row: number,
    column: number,
    graphInstance: TableFlowGraph,
  ) {
    this.graphInstance = graphInstance;
    this.row = row;
    this.column = column;
    this.element = this.createTabelCell(data, row, column, this.graphInstance);
    parentElement.appendChild(this.element);
  }

  createTabelCell(
    data: TFGraphNode | null,
    row,
    column,
    graphInstance: TableFlowGraph,
  ): HTMLElement {
    const el = createClassElement('div', 'tfgraph-cell');
    el.setAttribute('id', `${graphInstance.id}_cell_${row}_${column}`);
    if (data) {
      const node = createClassElement('div', 'tfgraph-node');
      if (data.type) node.classList.add(data.type);
      if (data.isBtn && this.graphInstance.mode !== 'edit') node.classList.add('isBtn');
      if (typeof this.graphInstance.options.renderNode === 'function') {
        node.appendChild(this.graphInstance.options.renderNode(data));
      } else {
        node.innerText = data.title;
      }

      // node.innerText = data.id;
      el.appendChild(node);
      this.hasNode = true;
      this.nodeEl = node;
      this.nodeData = data;
      this.rowSpan = data.rowSpan;
      this.colSpan = data.colSpan;
    } else {
      this.rowSpan = 1;
      this.colSpan = 1;
      this.hasNode = false;
    }
    // set min height base on row span
    el.style.minHeight = 80 * this.rowSpan + 'px';
    return el;
  }

  // cell controls for edit mode
  setEditControls() {
    this.controlLayer = createClassElement(
      'div',
      'tfgraph-cell-control-layer hidden',
      this.element,
    );
    // const controlRowEl = createClassElement(
    //   'div',
    //   'flex flex-row items-center justify-center p-15 flex-wrap',
    //   this.controlLayer,
    // );
    this.editDialog = new EditNodeDialog(this, this.graphInstance);
    if (this.nodeData) {
      new Button(this.controlLayer, {
        icon: 'move',
        type: 'primary',
        tooltip: this.graphInstance.options.labels.moveNode,
        className: 'absolute left-6 top-6 p-0 sm w-28 btn-tl',
        onClick: () => {
          this.graphInstance.tableController.startMoving(this);
        },
      });
      new Button(this.controlLayer, {
        icon: 'edit',
        type: 'primary',
        tooltip: this.graphInstance.options.labels.editNode,
        className: 'absolute left-6 bottom-6 p-0 sm w-28 btn-bl',
        onClick: () => {
          if (typeof this.graphInstance.options.editNode === 'function') {
            this.graphInstance.options.editNode(this.nodeData);
          } else {
            this.editDialog.show();
          }
        },
      });
      new Button(this.controlLayer, {
        icon: 'remove',
        type: 'danger',
        tooltip: this.graphInstance.options.labels.deleteNode,
        className: 'absolute right-6 top-6 p-0 sm w-28 btn-tr',
        onClick: () => {
          if (typeof this.graphInstance.options.onDeleteNode === 'function') {
            this.graphInstance.options.onDeleteNode(this.nodeData);
          }
        },
      });
      new Button(this.controlLayer, {
        icon: 'expand',
        type: 'primary',
        tooltip: this.graphInstance.options.labels.adjustNodeSize,
        className: 'absolute right-6 bottom-6 p-0 sm w-28 btn-br',
        onClick: () => {
          this.graphInstance.tableController.startResizing(this);
        },
      });
    } else {
      new Button(this.controlLayer, {
        icon: 'plus',
        type: 'primary',
        className: 'absolute left-6 top-6 p-0 sm w-28 btn-tl',
        tooltip: this.graphInstance.options.labels.addNode,
        onClick: () => {
          if (typeof this.graphInstance.options.addNode === 'function') {
            this.graphInstance.options.addNode(this.row, this.column);
          } else {
            this.editDialog.show();
          }
        },
      });
      if (
        this.graphInstance.options.totalRows > 1 &&
        this.row === this.graphInstance.options.totalRows - 1
      ) {
        this.deleteRowBtn = new Button(this.controlLayer, {
          icon: 'delete_row',
          type: 'danger',
          className: 'absolute right-6 top-6 p-0 sm w-28 btn-tr',
          tooltip: this.graphInstance.options.labels.deleteRow,
          onClick: () => {
            if (typeof this.graphInstance.options.deleteRow === 'function') {
              this.graphInstance.options.deleteRow();
            } else {
              this.graphInstance.refresh(
                Object.assign({}, this.graphInstance.options, {
                  totalRows: this.graphInstance.options.totalRows - 1,
                }),
              );
              if (typeof this.graphInstance.options.onDeleteRow === 'function') {
                this.graphInstance.options.onDeleteRow();
              }
            }
          },
        });
      }
      if (
        this.graphInstance.options.totalColumns > 1 &&
        this.column === this.graphInstance.options.totalColumns - 1
      ) {
        this.deleteColBtn = new Button(this.controlLayer, {
          icon: 'delete_col',
          type: 'danger',
          className: 'absolute right-6 bottom-6 p-0 sm w-28 btn-br',
          tooltip: this.graphInstance.options.labels.deleteColumn,
          onClick: () => {
            if (typeof this.graphInstance.options.deleteColumn === 'function') {
              // custom delete column method
              this.graphInstance.options.deleteColumn();
            } else {
              // auto delete column
              if (this.graphInstance.hasTableHeader) {
                // if has options.columns data (table header will be rendered)
                if (typeof this.graphInstance.options.onDeleteColumn === 'function') {
                  const targetColumn =
                    this.graphInstance.options.columns[this.graphInstance.options.totalColumns - 1];
                  this.graphInstance.options.onDeleteColumn(targetColumn);
                }
                this.graphInstance.options.columns.pop();
                this.graphInstance.refresh(Object.assign({}, this.graphInstance.options));
              } else {
                // if options.columns data is null or empty
                this.graphInstance.refresh(
                  Object.assign({}, this.graphInstance.options, {
                    columns: null,
                    totalColumns: this.graphInstance.options.totalColumns - 1,
                  }),
                );
                if (typeof this.graphInstance.options.onDeleteColumn === 'function') {
                  this.graphInstance.options.onDeleteColumn();
                }
              }
            }
          },
        });
      }
    }
    this.element.addEventListener('mouseenter', () => this.onMouseEnter());
    this.element.addEventListener('mouseleave', () => this.onMouseLeave());
  }

  public setViewModeControls() {
    if (this.nodeData) {
      this.element.addEventListener('click', () => this.onClickNode());
      if (this.nodeData.showPopup) {
        let contentEl: HTMLElement;
        if (typeof this.graphInstance.options.renderNodeHoverPopup === 'function') {
          contentEl = this.graphInstance.options.renderNodeHoverPopup(this.nodeData);
        } else {
          contentEl = createClassElement('div', 'flex flex-col items-center p-30');
          contentEl.innerHTML = this.nodeData.title;
        }

        this.popup = new Popup(this.element, {
          placement: 'top',
          contentElement: contentEl,
        });
        this.element.addEventListener('mouseenter', () => {
          if (this.popup) {
            this.popup.mouseEnter();
          }
        });
        this.element.addEventListener('mouseleave', () => {
          if (this.popup) {
            this.popup.mouseLeave();
          }
        });
      }
    }
  }

  onMouseEnter() {
    this.controlLayer.classList.remove('hidden');
    if (this.deleteRowBtn) {
      if (
        this.graphInstance.tableController.canDeleteRow &&
        this.graphInstance.lineController.canDeleteRow
      ) {
        this.deleteRowBtn.element.classList.remove('hidden');
      } else {
        this.deleteRowBtn.element.classList.add('hidden');
      }
    }
    if (this.deleteColBtn) {
      if (
        this.graphInstance.tableController.canDeleteColumn &&
        this.graphInstance.lineController.canDeleteColumn
      ) {
        this.deleteColBtn.element.classList.remove('hidden');
      } else {
        this.deleteColBtn.element.classList.add('hidden');
      }
    }
  }

  onMouseLeave() {
    this.controlLayer.classList.add('hidden');
  }

  onClickNode() {
    if (typeof this.graphInstance.options.onClickNode === 'function') {
      this.graphInstance.options.onClickNode(this.nodeData, this.nodeEl);
    }
  }

  public setIsTarget(isTarget: boolean) {
    if (isTarget && !this.isTarget) {
      this.isTarget = true;
      this.element.style.opacity = '0.4';
    } else if (!isTarget && this.isTarget) {
      this.isTarget = false;
      this.element.style.opacity = '1';
    }
  }
}
