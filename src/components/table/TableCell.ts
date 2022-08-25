import { TableFlowGraph, TFGraphNode } from '../../index';
import { createClassElement } from '../../lib/dom';
import Button from '../ui/button/Button';
import EditNodeDialog from './node/EditNodeDialog';
import { remove } from 'lodash-es';
import Node from './node/Node';

/**
 * table-flow-graph tabel cell
 */
export default class TableCell {
  public graphInstance: TableFlowGraph;
  public element: HTMLElement;
  public controlLayer: HTMLElement;
  public node: Node;
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
    this.createTabelCell(data, row, column, parentElement);
  }

  createTabelCell(data: TFGraphNode | null, row, column, parentElement) {
    this.element = createClassElement('div', 'tfgraph-cell', parentElement);
    this.element.setAttribute('id', `${this.graphInstance.id}_cell_${row}_${column}`);
    if (data) {
      this.hasNode = true;
      this.nodeData = data;
      this.rowSpan = data.rowSpan;
      this.colSpan = data.colSpan;
      this.node = new Node(this);
    } else {
      this.rowSpan = 1;
      this.colSpan = 1;
      this.hasNode = false;
    }
    // set min height base on row span
    this.element.style.minHeight = 80 * this.rowSpan + 'px';
  }

  // cell controls for edit mode
  setEditorControls() {
    this.controlLayer = createClassElement(
      'div',
      'tfgraph-cell-control-layer hidden',
      this.element,
    );
    this.editDialog = new EditNodeDialog(this.graphInstance, this);
    if (this.nodeData) {
      // Move node button
      new Button(this.controlLayer, {
        icon: 'move',
        type: 'primary',
        tooltip: this.graphInstance.options.labels.moveNode,
        className: 'absolute left-6 top-6 p-0 sm w-28 btn-tl',
        onClick: () => {
          this.graphInstance.tableController.startMoving(this);
        },
      });
      // Edit node button
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
      // Delete node button
      new Button(this.controlLayer, {
        icon: 'x',
        type: 'danger',
        tooltip: this.graphInstance.options.labels.deleteNode,
        className: 'absolute right-6 top-6 p-0 sm w-28 btn-tr',
        onClick: () => {
          if (typeof this.graphInstance.options.deleteNode === 'function') {
            this.graphInstance.options.deleteNode(this.nodeData);
          } else {
            // TODO remove cell
            remove(this.graphInstance.options.nodes, (item) => {
              return this.nodeData.id === item.id;
            });
            this.graphInstance.refresh();
            if (typeof this.graphInstance.options.onDeleteNode === 'function') {
              this.graphInstance.options.onDeleteNode(this.nodeData);
            }
          }
        },
      });
      // Resize node button
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
      // Add node button
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
        // Delete row button
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
        // Delete column button
        this.deleteColBtn = new Button(this.controlLayer, {
          icon: 'delete_col',
          type: 'danger',
          className: 'absolute right-6 bottom-6 p-0 sm w-28 btn-br',
          tooltip: this.graphInstance.options.labels.deleteColumn,
          onClick: () => {
            if (typeof this.graphInstance.options.deleteColumn === 'function') {
              // custom delete column method
              const targetColumn =
                this.graphInstance.options.columns[this.graphInstance.options.totalColumns - 1];
              this.graphInstance.options.deleteColumn(targetColumn);
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

  public setViewerControls() {
    if (this.nodeData) {
      this.node.setViewerControls();
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
