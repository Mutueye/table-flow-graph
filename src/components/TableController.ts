import { TableFlowGraph } from '../index';
import { createClassElement, removeElement } from '../lib/dom';
import TableCell from './TableCell';
import TableHeaderCell from './TableHeaderCell';

/**
 * table-flow-graph tabel
 */
export default class Table {
  graphInstance: TableFlowGraph;
  public element: HTMLElement;
  public cells: TableCell[];
  public headerCells: TableHeaderCell[];
  public canDeleteColumn: boolean;
  public canDeleteRow: boolean;
  public occupiedList: number[][]; // 1: occupied, 0: not occupied

  constructor(graphInstance: TableFlowGraph) {
    this.graphInstance = graphInstance;
    this.element = createClassElement('table', 'tfgraph-table', this.graphInstance.element);
    this.headerCells = [];
    this.cells = [];
    this.canDeleteColumn = false;
    this.canDeleteRow = false;
    this.occupiedList = [];
  }

  public renderTable() {
    this.element.innerHTML = '';
    this.createHeader();
    this.createTds();
    this.createCells();
    this.setControls();
  }

  public setControls() {
    // get canDeleteColumn & canDeleteRow by this.cells
    const totalColumns = this.graphInstance.options.totalColumns;
    const totalRows = this.graphInstance.options.totalRows;
    this.canDeleteColumn = true;
    this.canDeleteRow = true;
    for (let i = 0; i < totalRows - 1; i++) {
      if (this.occupiedList[i][totalColumns - 1] !== 0) {
        this.canDeleteColumn = false;
      }
    }
    for (let i = 0; i < totalColumns - 1; i++) {
      if (this.occupiedList[totalRows - 1][i] !== 0) {
        this.canDeleteRow = false;
      }
    }
    this.headerCells.forEach((headerCell) => {
      if (this.graphInstance.mode === 'edit') {
        headerCell.setControls();
      }
    });
    // TODO set table cell controls
    // 1. remove last row
    // 2. empty cell: add node
    // 3. node cell: edit node content
    // 4. node cell: adjust node size
    // 5. nofr cell: move node position
  }

  // render table header
  createHeader() {
    if (this.graphInstance.options.columns && this.graphInstance.options.columns.length > 0) {
      const tr = createClassElement('tr', 'tfgraph-tr');
      this.graphInstance.options.columns.forEach((column, index) => {
        const headerCell = new TableHeaderCell(tr, column, index, this.graphInstance);
        this.headerCells.push(headerCell);
      });
      this.element.appendChild(tr);
    }
  }

  // render table rows and tds
  createTds() {
    for (let i = 0; i < this.graphInstance.options.totalRows; i++) {
      const tr = createClassElement('tr', 'tfgraph-tr');
      tr.setAttribute('id', `${this.graphInstance.id}_tr_${i}`);
      const occupiedRow: number[] = [];
      this.occupiedList.push(occupiedRow);
      for (let j = 0; j < this.graphInstance.options.totalColumns; j++) {
        const td = createClassElement('td', 'tfgraph-td', tr);
        td.setAttribute('id', `${this.graphInstance.id}_td_${i}_${j}`);
        occupiedRow.push(0);
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
              this.occupiedList[j][i] = 1;
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
            this.occupiedList[i][j] = 1;
          }
          this.cells.push(new TableCell(targetTd, targetNode, i, j, this.graphInstance));
        }
      }
    }
  }
}
