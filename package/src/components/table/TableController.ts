import { TableFlowGraph, ColumnSpec, RowSpec, TableGridRect } from '../../index';
import { createClassElement, removeElement, setStyles } from '../../lib/dom';
import TableCell from './TableCell';
import TableHeaderCell from './TableHeaderCell';
import TableMask from './TableMask';
import Button from '../ui/button/Button';
import { setColumnAndRowDeletable } from '../../lib/utils';

/**
 * table-flow-graph tabel
 */
export default class Table {
  graphInstance: TableFlowGraph;
  public element: HTMLElement;
  public bottomControlEL: HTMLElement | null;
  public cells: TableCell[];
  public headerCells: TableHeaderCell[];
  public canDeleteColumn: boolean;
  public canDeleteRow: boolean;
  public occupiedList: number[][]; // 1: occupied, 0: not occupied
  public tableMask: TableMask;
  public isMovingCell: boolean;
  public isResizingCell: boolean;

  constructor(graphInstance: TableFlowGraph) {
    this.graphInstance = graphInstance;
    this.element = createClassElement('table', 'tfgraph-table', this.graphInstance.element);
    this.initTableStatus();
  }

  private initTableStatus() {
    this.headerCells = [];
    this.cells = [];
    this.canDeleteColumn = false;
    this.canDeleteRow = false;
    this.occupiedList = [];
    this.isMovingCell = false;
    this.isResizingCell = false;
  }

  // render table and set table controls
  public renderTable() {
    this.initTableStatus();
    this.element.innerHTML = '';
    this.createHeader();
    this.createTds();
    this.createCells();
    this.setControls();
  }

  public setControls() {
    const isEditMode = this.graphInstance.mode === 'edit';
    if (isEditMode) {
      const deleteableObj = setColumnAndRowDeletable(
        this.occupiedList,
        this.graphInstance.options.totalRows,
        this.graphInstance.options.totalColumns,
      );
      this.canDeleteColumn = deleteableObj.canDeleteColumn;
      this.canDeleteRow = deleteableObj.canDeleteRow;

      this.cells.forEach((cell) => {
        // set tabel cell controls
        cell.setEditorControls();
      });

      // wait for table render ready
      setTimeout(() => {
        const columnSpecs: ColumnSpec[] = []; // [{left, width, columnIndex}]
        const rowSpecs: RowSpec[] = []; // [{ top, height, rowIndex}]

        this.headerCells.forEach((headerCell) => {
          // set headerCell controls
          headerCell.setEditControls();
          // get columns's width and position
          columnSpecs.push({
            width: headerCell.element.getBoundingClientRect().width + 1,
            left: headerCell.element.offsetLeft - 1,
            columnIndex: headerCell.columnIndex,
          });
        });

        // get rowSpects(row top position and height)
        for (let i = 0; i < this.graphInstance.options.totalRows; i++) {
          const targetCell = this.getMinRowSpanCell(i, 1);
          const targetCellHeight = targetCell.element.getBoundingClientRect().height;
          const targetCellRowHeight = targetCellHeight / targetCell.rowSpan;
          rowSpecs.push({
            top: targetCell.element.offsetTop - 1 + (i - targetCell.row) * targetCellRowHeight,
            height: targetCellRowHeight + 1,
            rowIndex: i,
          });
        }
        // each table grid's left, top, width, height without rowspan and colspan
        const tableGridRectList: TableGridRect[] = [];
        rowSpecs.forEach((rowSpec) => {
          columnSpecs.forEach((columnSpec) => {
            tableGridRectList.push(Object.assign({}, rowSpec, columnSpec));
          });
        });
        this.tableMask = new TableMask(tableGridRectList, this.graphInstance);
      }, 1);
    } else {
      // click node event
      this.cells.forEach((cell) => {
        // set tabel cell controls
        cell.setViewerControls();
      });
    }
    this.setBottomControl();

    // set table cell controls
    // 1. remove last row ✓
    // 2. empty cell: add node ✓
    // 3. node cell: edit node content ✓
    // 4. node cell: adjust node size ✓
    // 5. node cell: move node position ✓
  }

  //  recursively find min rowspan cell for targetRow
  getMinRowSpanCell(row: number, minRowSpan = 1) {
    let targetRowCell: TableCell | null = null;
    const rowCells = this.cells.filter((cell) => cell.row === row);
    if (rowCells.length === 0) {
      if (row > 0) {
        targetRowCell = this.getMinRowSpanCell(row - 1, minRowSpan + 1);
      }
    } else {
      let rowSpan = 20;
      rowCells.forEach((cell) => {
        if (cell.rowSpan < rowSpan && cell.rowSpan >= minRowSpan) {
          rowSpan = cell.rowSpan;
          targetRowCell = cell;
        }
      });
    }
    return targetRowCell;
  }

  public onMouseMove() {
    if (this.isMovingCell || this.isResizingCell) {
      this.tableMask.onMouseMove();
    }
  }

  public startMoving(targetCell: TableCell) {
    this.isMovingCell = true;
    this.graphInstance.toolbar.hintMgr.setHint('moveNode');
    this.graphInstance.toolbar.disable();
    this.tableMask.startMask(targetCell);
  }

  public stopMoving() {
    this.isMovingCell = false;
    this.graphInstance.toolbar.hintMgr.setHint('idel');
    this.graphInstance.toolbar.enable();
    this.tableMask.stopMask();
  }

  public startResizing(targetCell: TableCell) {
    this.isResizingCell = true;
    this.graphInstance.toolbar.hintMgr.setHint('resizeNode');
    this.graphInstance.toolbar.disable();
    this.tableMask.startMask(targetCell);
  }

  public stopResizing() {
    this.isResizingCell = false;
    this.graphInstance.toolbar.hintMgr.setHint('idel');
    this.graphInstance.toolbar.enable();
    this.tableMask.stopMask();
  }

  // sumit cell position / size change
  public submitCellChange() {
    this.isMovingCell = false;
    this.isResizingCell = false;
    this.graphInstance.toolbar.enable();
    this.tableMask.submitChange();
  }

  public setBottomControl() {
    if (
      this.graphInstance.mode === 'edit' &&
      !this.bottomControlEL &&
      this.graphInstance.options.totalRows < this.graphInstance.options.maxRows
    ) {
      this.bottomControlEL = createClassElement(
        'div',
        'flex flex-row items-center justify-between mt-15',
        this.graphInstance.element,
      );
      // add row btn
      new Button(this.bottomControlEL, {
        icon: 'plus',
        label: this.graphInstance.options.labels.addRow,
        className: 'flex-1',
        onClick: () => {
          if (typeof this.graphInstance.options.addRow === 'function') {
            this.graphInstance.options.addRow();
          } else {
            this.graphInstance.refresh(
              Object.assign({}, this.graphInstance.options, {
                totalRows: this.graphInstance.options.totalRows + 1,
              }),
            );
            if (typeof this.graphInstance.options.onAddRow === 'function') {
              this.graphInstance.options.onAddRow();
            }
          }
        },
      });
    } else {
      if (this.bottomControlEL) {
        removeElement(this.bottomControlEL);
        this.bottomControlEL = null;
      }
    }
  }

  // render table header
  createHeader() {
    if (this.graphInstance.options.tableLayoutFixed) {
      setStyles(this.element, { tableLayout: 'fixed' });
    }
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
    if (nodes && nodes.length > 0) {
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
    }

    // remove spaned tabell cell element
    spanedTdIds.forEach((id) => removeElement(document.getElementById(id)));

    // create table cells
    for (let i = 0; i < this.graphInstance.options.totalRows; i++) {
      for (let j = 0; j < this.graphInstance.options.totalColumns; j++) {
        if (!spanedTdIds.includes(`${this.graphInstance.id}_td_${i}_${j}`)) {
          const targetNode =
            nodes && nodes.length > 0
              ? nodes.find((node) => node.row === i && node.column === j)
              : null;
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
