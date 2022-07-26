import { TableFlowGraph } from '../../index';
import { createClassElement } from '../../lib/dom';
import { TFGraphNode } from '../../types';
import Button from '../ui/button/Button';

/**
 * table-flow-graph tabel cell
 */
export default class TableCell {
  public graphInstance: TableFlowGraph;
  public element: HTMLElement;
  public nodeEl: HTMLElement;
  public controlLayer: HTMLElement;
  public nodeData?: TFGraphNode;
  public hasNode: boolean;
  public row: number;
  public column: number;
  public rowSpan: number;
  public colSpan: number;

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
      const node = createClassElement('button', 'tfgraph-node');
      node.classList.add(data.type);
      if (data.isBtn && this.graphInstance.mode !== 'edit') node.classList.add('isBtn');
      node.innerText = data.title;
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
    if (this.nodeData) {
      new Button(this.controlLayer, {
        icon: 'move',
        type: 'primary',
        tooltip: this.graphInstance.options.labels.moveNode,
        className: 'absolute left-6 top-6 p-0 sm w-28',
        onClick: () => {
          // TODO
          console.log('clicked::::::::');
        },
      });
      new Button(this.controlLayer, {
        icon: 'edit',
        type: 'primary',
        tooltip: this.graphInstance.options.labels.editNode,
        className: 'absolute left-6 bottom-6 p-0 sm w-28',
        onClick: () => {
          // TODO
          console.log('clicked::::::::');
        },
      });
      new Button(this.controlLayer, {
        icon: 'remove',
        type: 'danger',
        tooltip: this.graphInstance.options.labels.deleteNode,
        className: 'absolute right-6 top-6 p-0 sm w-28',
        onClick: () => {
          // TODO
          console.log('clicked::::::::');
        },
      });
      new Button(this.controlLayer, {
        icon: 'expand',
        type: 'primary',
        tooltip: this.graphInstance.options.labels.adjustNodeSize,
        className: 'absolute right-6 bottom-6 p-0 sm w-28',
        onClick: () => {
          // TODO
          console.log('clicked::::::::');
        },
      });
    } else {
      new Button(this.controlLayer, {
        icon: 'plus',
        type: 'primary',
        className: 'absolute left-6 top-6 p-0 sm w-28',
        tooltip: this.graphInstance.options.labels.addNode,
        onClick: () => {
          // TODO
          console.log('clicked::::::::');
        },
      });
      if (
        this.row === this.graphInstance.options.totalRows - 1 &&
        this.graphInstance.tableController.canDeleteRow
      ) {
        new Button(this.controlLayer, {
          icon: 'x',
          type: 'danger',
          className: 'absolute right-6 top-6 p-0 sm w-28',
          tooltip: this.graphInstance.options.labels.deleteRow,
          onClick: () => {
            if (typeof this.graphInstance.options.onDeleteRow === 'function') {
              this.graphInstance.options.onDeleteRow();
            }
          },
        });
      }
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
