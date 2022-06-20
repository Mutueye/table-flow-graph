import { TableFlowGraph } from '..';
import TFGraphAnchor from '../components/TFGraphAnchor';
import TFGraphCell from '../components/TFGraphCell';
import { Position } from '../types';
import { createClassElement, removeElement } from './dom';

/**
 * render flow graph table
 * @param {TableFlowGraph} graphInstance table-flow-graph instance
 * TODO render row header
 */
export function renderTable(graphInstance: TableFlowGraph) {
  const tableEl = createClassElement('table', 'tfgraph-table', graphInstance.element);
  createHeader(graphInstance, tableEl);
  createRows(graphInstance, tableEl);
  createTds(graphInstance);
}

// render table header
const createHeader = (graphInstance: TableFlowGraph, parentEl: HTMLTableElement) => {
  const tr = createClassElement('tr', 'tfgraph-tr');
  graphInstance.options.columns.forEach((column, index) => {
    const th = createClassElement('th', 'tfgraph-th', tr);
    th.innerHTML = column.title;
    th.setAttribute('width', column.width);
    th.setAttribute('id', `${graphInstance.id}_col_${index}`);
  });
  parentEl.appendChild(tr);
};

// render table rows and tds
const createRows = (graphInstance: TableFlowGraph, parentEl: HTMLTableElement) => {
  for (let i = 0; i < graphInstance.options.totalRows; i++) {
    const tr = createClassElement('tr', 'tfgraph-tr');
    tr.setAttribute('id', `${graphInstance.id}_tr_${i}`);
    for (let j = 0; j < graphInstance.options.totalColumns; j++) {
      const td = createClassElement('td', 'tfgraph-td', tr);
      td.setAttribute('id', `${graphInstance.id}_td_${i}_${j}`);
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
            spanedTdIds.push(`${graphInstance.id}_td_${j}_${i}`);
          }
        }
      }
    }
  });
  // remove spaned tabell cell element
  spanedTdIds.forEach((id) => removeElement(document.getElementById(id)));

  // create table cells
  for (let i = 0; i < graphInstance.options.totalRows; i++) {
    for (let j = 0; j < graphInstance.options.totalColumns; j++) {
      if (!spanedTdIds.includes(`${graphInstance.id}_td_${i}_${j}`)) {
        const targetNode = nodes.find((node) => node.row === i && node.column === j);
        const targetTd = document.getElementById(`${graphInstance.id}_td_${i}_${j}`);
        if (targetNode) {
          targetTd.setAttribute('colSpan', targetNode.colSpan.toString());
          targetTd.setAttribute('rowSpan', targetNode.rowSpan.toString());
        }
        graphInstance.cells.push(new TFGraphCell(targetTd, targetNode, i, j, graphInstance));
      }
    }
  }
};

// render lines layer
export function renderLinesLayer(graphInstance: TableFlowGraph) {
  return createClassElement('div', 'tfgraph-line-layer', graphInstance.element);
}

// render anchors layer
export function renderAnchorsLayer(graphInstance: TableFlowGraph) {
  return createClassElement('div', 'tfgraph-anchor-layer', graphInstance.element);
}

// draw line between two point
export function renderLine(
  parentEl: HTMLElement,
  positionA: Position, // x and y position relative to table element
  positionB: Position,
  thickness: number = 2,
  isStart: boolean = true,
  isEnd: boolean = true,
) {
  // start point
  var x1 = positionA.x;
  var y1 = positionA.y;
  // end point
  var x2 = positionB.x;
  var y2 = positionB.y;

  // distance
  var length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

  // center
  var cx = (x1 + x2) / 2 - length / 2;
  var cy = (y1 + y2) / 2 - thickness / 2;
  // angle
  var angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  const lineElement = createClassElement('div', 'tfgraph-line', parentEl);
  if (isStart) createClassElement('div', 'start-point', lineElement);
  if (isEnd) createClassElement('div', 'arrow', lineElement);
  lineElement.style.width = length + thickness + 'px';
  lineElement.style.height = thickness + 'px';
  lineElement.style.left = cx - 0.5 * thickness + 'px';
  lineElement.style.top = cy + 'px';
  lineElement.style.borderRadius = thickness + 'px';
  lineElement.style.transform = `rotate(${angle}deg)`;
}

// connect points with lines
export function renderLineGroup(
  parentEl: HTMLElement,
  anchorList: TFGraphAnchor[],
  extraEndPoint?: Position, // The last point is cursor postion when drawing lines
) {
  if (anchorList.length < 2) return;
  const lineGroupElement = createClassElement('div', 'tfgraph-line-group', parentEl);
  const pointList: Position[] = anchorList.map((anchor) => ({
    x: anchor.posX,
    y: anchor.posY,
  }));
  if (extraEndPoint) pointList.push(extraEndPoint);
  for (let i = 0; i < pointList.length - 1; i++) {
    renderLine(
      lineGroupElement,
      pointList[i],
      pointList[i + 1],
      2,
      i === 0,
      i === anchorList.length - 2,
    );
  }
}
