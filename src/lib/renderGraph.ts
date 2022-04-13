import { TableFlowGraph } from '..';
import TFGraphCell from '../components/TFGraphCell';
import { TFGraphColumn } from '../types';
import { createClassElement, removeElement } from './dom';

/**
 * render flow graph table
 * @param {TableFlowGraph} graphInstance table-flow-graph instance
 */
export function renderTable(graphInstance: TableFlowGraph) {
  const tableEl = createClassElement('table', 'tfgraph-table', graphInstance.element);
  createHeader(graphInstance.options.columns, tableEl);
  createRows(graphInstance.options.totalRows, graphInstance.options.columns.length, tableEl);
  createTds(graphInstance);
}

// render table header
const createHeader = (columns: TFGraphColumn[], parentEl: HTMLTableElement) => {
  const tr = createClassElement('tr', 'tfgraph-tr');
  columns.forEach((column, index) => {
    const th = createClassElement('th', 'tfgraph-th', tr);
    th.innerHTML = column.title;
    th.setAttribute('width', column.width);
    th.setAttribute('id', `col_${index}`);
  });
  parentEl.appendChild(tr);
};

// render table row
const createRows = (totalRows: number, totalColumns: number, parentEl: HTMLTableElement) => {
  for (let i = 0; i < totalRows; i++) {
    const tr = createClassElement('tr', 'tfgraph-tr');
    tr.setAttribute('id', `tr_${i}`);
    for (let j = 0; j < totalColumns; j++) {
      const td = createClassElement('td', 'tfgraph-td', tr);
      td.setAttribute('id', `td_${i}_${j}`);
    }
    parentEl.appendChild(tr);
  }
};

// render tabel cells
const createTds = (graphInstance: TableFlowGraph) => {
  // spaned table cell id array
  const spanedTdIds = [];
  const nodes = graphInstance.options.nodes;
  nodes.forEach((node) => {
    // set spanned tabel cell ids
    if (node.colSpan > 1 || node.rowSpan > 1) {
      for (let i = node.column; i < node.column + node.colSpan; i++) {
        for (let j = node.row; j < node.row + node.rowSpan; j++) {
          if (!(i === node.column && j === node.row)) {
            spanedTdIds.push(`td_${j}_${i}`);
          }
        }
      }
    }
  });
  // remove spaned tabell cell element
  spanedTdIds.forEach((id) => removeElement(document.getElementById(id)));

  // create table cells
  nodes.forEach((node) => {
    if (!spanedTdIds.includes(`td_${node.row}_${node.column}`)) {
      const targetTd = document.getElementById(`td_${node.row}_${node.column}`);
      if (targetTd) {
        // targetTd.innerHTML = node.title;
        targetTd.setAttribute('colSpan', node.colSpan.toString());
        targetTd.setAttribute('rowSpan', node.rowSpan.toString());
      }
      graphInstance.cells.push(new TFGraphCell(targetTd, node));
    }
  });
};
