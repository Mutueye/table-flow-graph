import { TFGraphOptions, TFGraphColumn, TFGraphNode } from '../types';
import { createClassElement, removeElement } from './dom';

export function renderTable(options: TFGraphOptions, parentNode: HTMLElement) {
  const tableEl = createClassElement('table', 'tfgraph-table');
  createHeader(options.columns, tableEl);
  createRows(options.totalRows, options.columns.length, tableEl);
  parentNode.appendChild(tableEl);
  createNodes(options.nodes);
}

const createHeader = (columns: TFGraphColumn[], parentNode: HTMLTableElement) => {
  const tr = createClassElement('tr', 'tfgraph-tr');
  columns.forEach((column, index) => {
    const th = createClassElement('th', 'tfgraph-th', tr);
    th.innerHTML = column.title;
    th.setAttribute('width', column.width);
    th.setAttribute('id', `col_${index}`);
  });
  parentNode.appendChild(tr);
};

const createRows = (totalRows: number, totalColumns: number, parentNode: HTMLTableElement) => {
  for (let i = 0; i < totalRows; i++) {
    const tr = createClassElement('tr', 'tfgraph-tr');
    tr.setAttribute('id', `tr_${i}`);
    for (let j = 0; j < totalColumns; j++) {
      const td = createClassElement('td', 'tfgraph-td', tr);
      td.setAttribute('id', `td_${i}_${j}`);
    }
    parentNode.appendChild(tr);
  }
};

const createNodes = (nodes: TFGraphNode[]) => {
  // 被合并的td的id数组
  const spanedTdIds = [];
  nodes.forEach((node) => {
    const targetTd = document.getElementById(`td_${node.row}_${node.column}`);
    if (targetTd) {
      targetTd.innerHTML = node.title;
      targetTd.setAttribute('colSpan', node.colSpan.toString());
      targetTd.setAttribute('rowSpan', node.rowSpan.toString());
      if (node.colSpan > 1 || node.rowSpan > 1) {
        for (let i = node.column; i < node.column + node.colSpan; i++) {
          for (let j = node.row; j < node.row + node.rowSpan; j++) {
            if (!(i === node.column && j === node.row)) {
              spanedTdIds.push(`td_${j}_${i}`);
            }
          }
        }
      }
    }
  });
  spanedTdIds.forEach((id) => removeElement(document.getElementById(id)));
};
