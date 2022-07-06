import { TableFlowGraph } from '../index';
import { createClassElement, removeElement } from '../lib/dom';
import TableCell from './TableCell';
import TableHeaderCell from './TableHeaderCell';

/**
 * table-flow-graph tabel
 */
export default class Table {
  public element: HTMLElement;
  graphInstance: TableFlowGraph;
  public cells: TableCell[];

  constructor(graphInstance: TableFlowGraph) {
    this.graphInstance = graphInstance;
    this.element = createClassElement('table', 'tfgraph-table', this.graphInstance.element);
    this.cells = [];
  }

  public renderTable() {
    this.createHeader();
    this.createRows();
    this.createCells();
  }

  // render table header
  createHeader() {
    const tr = createClassElement('tr', 'tfgraph-tr');
    this.graphInstance.options.columns.forEach((column, index) => {
      new TableHeaderCell(tr, column, index, this.graphInstance);
    });
    this.element.appendChild(tr);
  }

  // render table rows and tds
  createRows() {
    for (let i = 0; i < this.graphInstance.options.totalRows; i++) {
      const tr = createClassElement('tr', 'tfgraph-tr');
      tr.setAttribute('id', `${this.graphInstance.id}_tr_${i}`);
      for (let j = 0; j < this.graphInstance.options.totalColumns; j++) {
        const td = createClassElement('td', 'tfgraph-td', tr);
        td.setAttribute('id', `${this.graphInstance.id}_td_${i}_${j}`);
      }
      this.element.appendChild(tr);
    }
  }

  // render tabel cells
  createCells() {
    // spaned table cell id array
    const spanedTdIds = [];
    const nodes = this.graphInstance.options.nodes;
    nodes.forEach((node) => {
      // set spanned tabel cell ids
      if (node.colSpan > 1 || node.rowSpan > 1) {
        for (let i = node.column; i < node.column + node.colSpan; i++) {
          for (let j = node.row; j < node.row + node.rowSpan; j++) {
            if (!(i === node.column && j === node.row)) {
              spanedTdIds.push(`${this.graphInstance.id}_td_${j}_${i}`);
            }
          }
        }
      }
    });
    // remove spaned tabell cell element
    spanedTdIds.forEach((id) => removeElement(document.getElementById(id)));

    // create table cells
    for (let i = 0; i < this.graphInstance.options.totalRows; i++) {
      for (let j = 0; j < this.graphInstance.options.totalColumns; j++) {
        if (!spanedTdIds.includes(`${this.graphInstance.id}_td_${i}_${j}`)) {
          const targetNode = nodes.find((node) => node.row === i && node.column === j);
          const targetTd = document.getElementById(`${this.graphInstance.id}_td_${i}_${j}`);
          if (targetNode) {
            targetTd.setAttribute('colSpan', targetNode.colSpan.toString());
            targetTd.setAttribute('rowSpan', targetNode.rowSpan.toString());
          }
          this.cells.push(new TableCell(targetTd, targetNode, i, j, this.graphInstance));
        }
      }
    }
  }
}
