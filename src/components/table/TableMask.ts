import { TableFlowGraph } from '../../index';
import { createClassElement, removeElement } from '../../lib/dom';
import { CellPositionAndSize, TableGridRect } from '../../types';
import TableCell from './TableCell';
import TableMaskBox from './TableMaskBox';
import { isEqual, cloneDeep } from 'lodash-es';

/**
 * table-flow-graph anchor controller
 */
export default class TableMask {
  graphInstance: TableFlowGraph;
  public maskBox: TableMaskBox;
  public element: HTMLElement;
  public tableGridRectList: TableGridRect[];
  public mouseGridRect: TableGridRect;
  public targetCell: TableCell;
  public targetCellRect: TableGridRect;
  public resultCellPositionAndSize: CellPositionAndSize;
  public filteredOccupiedList: number[][]; // 1: occupied, 0: not occupied

  constructor(tableGridRectList: TableGridRect[], graphInstance: TableFlowGraph) {
    this.graphInstance = graphInstance;
    this.element = createClassElement(
      'div',
      'tfgraph-cell-mask-layer hidden',
      graphInstance.element,
    );
    this.tableGridRectList = tableGridRectList;
  }

  private showMask(targetTableCell: TableCell) {
    this.targetCell = targetTableCell;
    this.targetCell.setIsTarget(true);
    this.setFilteredOccupiedList();
    this.maskBox = new TableMaskBox(this.element, this.targetCell, this.graphInstance);
    this.mouseGridRect = this.getMouseRect();
    this.targetCellRect = this.getRectByRowAndColumn(this.targetCell.row, this.targetCell.column);
    this.setMaskBoxStatus();
  }

  // occupied list without target tabel cell
  private setFilteredOccupiedList() {
    this.filteredOccupiedList = cloneDeep(this.graphInstance.tableController.occupiedList);
    for (let i = this.targetCell.row; i < this.targetCell.row + this.targetCell.rowSpan; i++) {
      for (
        let j = this.targetCell.column;
        j < this.targetCell.column + this.targetCell.colSpan;
        j++
      ) {
        this.filteredOccupiedList[i][j] = 0;
      }
    }
  }

  // set maskbox position/size/disabled etc.
  private setMaskBoxStatus() {
    if (this.graphInstance.tableController.isMovingCell) {
      this.resultCellPositionAndSize = {
        row:
          this.mouseGridRect.rowIndex + this.targetCell.rowSpan >
          this.graphInstance.options.totalRows
            ? this.graphInstance.options.totalRows - this.targetCell.rowSpan
            : this.mouseGridRect.rowIndex,
        column:
          this.mouseGridRect.columnIndex + this.targetCell.colSpan >
          this.graphInstance.options.totalColumns
            ? this.graphInstance.options.totalColumns - this.targetCell.colSpan
            : this.mouseGridRect.columnIndex,
        rowSpan: this.targetCell.rowSpan,
        colSpan: this.targetCell.colSpan,
      };
      this.maskBox.element.classList.add('moving');
    } else {
      this.resultCellPositionAndSize = {
        row: Math.min(this.targetCellRect.rowIndex, this.mouseGridRect.rowIndex),
        column: Math.min(this.targetCellRect.columnIndex, this.mouseGridRect.columnIndex),
        rowSpan: Math.abs(this.targetCellRect.rowIndex - this.mouseGridRect.rowIndex) + 1,
        colSpan: Math.abs(this.targetCellRect.columnIndex - this.mouseGridRect.columnIndex) + 1,
      };
      this.maskBox.element.classList.add('resizing');
    }
    const topLeftRect = this.getRectByRowAndColumn(
      this.resultCellPositionAndSize.row,
      this.resultCellPositionAndSize.column,
    );
    const bottomRightRect = this.getRectByRowAndColumn(
      this.resultCellPositionAndSize.row + this.resultCellPositionAndSize.rowSpan - 1,
      this.resultCellPositionAndSize.column + this.resultCellPositionAndSize.colSpan - 1,
    );
    if (bottomRightRect && topLeftRect) {
      this.maskBox.setPositinAndSize({
        left: topLeftRect.left,
        top: topLeftRect.top,
        width: bottomRightRect.left - topLeftRect.left + bottomRightRect.width + 1,
        height: bottomRightRect.top - topLeftRect.top + bottomRightRect.height + 1,
      });
    }

    // set maskbox disable/enable
    let doable = true;
    for (
      let i = this.resultCellPositionAndSize.row;
      i <
      Math.min(
        this.resultCellPositionAndSize.row + this.resultCellPositionAndSize.rowSpan,
        this.graphInstance.options.totalRows,
      );
      i++
    ) {
      for (
        let j = this.resultCellPositionAndSize.column;
        j <
        Math.min(
          this.resultCellPositionAndSize.column + this.resultCellPositionAndSize.colSpan,
          this.graphInstance.options.totalColumns,
        );
        j++
      ) {
        if (!this.filteredOccupiedList[i] || this.filteredOccupiedList[i][j] > 0) {
          doable = false;
        }
      }
    }
    if (doable) {
      this.maskBox.enable();
    } else {
      this.maskBox.disable();
    }
  }

  public startMask(targetTableCell: TableCell) {
    this.element.classList.remove('hidden');
    this.showMask(targetTableCell);
  }

  public stopMask() {
    this.element.classList.add('hidden');
    removeElement(this.maskBox.element);
    this.targetCell.setIsTarget(false);
    this.maskBox = null;
  }

  public submitChange() {
    this.stopMask();
    const targetCellPositionAndSize: CellPositionAndSize = {
      row: this.targetCell.row,
      column: this.targetCell.column,
      rowSpan: this.targetCell.rowSpan,
      colSpan: this.targetCell.colSpan,
    };
    if (!isEqual(this.resultCellPositionAndSize, targetCellPositionAndSize)) {
      // const oldNode = cloneDeep(this.targetCell.nodeData);
      this.targetCell.nodeData.row = this.resultCellPositionAndSize.row;
      this.targetCell.nodeData.column = this.resultCellPositionAndSize.column;
      this.targetCell.nodeData.rowSpan = this.resultCellPositionAndSize.rowSpan;
      this.targetCell.nodeData.colSpan = this.resultCellPositionAndSize.colSpan;
      // 提交变更
      if (typeof this.graphInstance.options.onEditNode === 'function') {
        this.graphInstance.options.onEditNode(this.targetCell.nodeData);
      }
      this.graphInstance.refresh();
    }
  }

  // get tableGridRect of current mouse position at
  private getMouseRect() {
    const mouseX = this.graphInstance.mousePosition.x;
    const mouseY = this.graphInstance.mousePosition.y;
    let targetGridRect: TableGridRect;
    this.tableGridRectList.forEach((gridRect) => {
      if (
        mouseY > gridRect.top &&
        mouseY < gridRect.top + gridRect.height &&
        mouseX > gridRect.left &&
        mouseX < gridRect.left + gridRect.width
      ) {
        targetGridRect = gridRect;
      }
    });
    return targetGridRect;
  }

  private getRectByRowAndColumn(row, column) {
    // const targetCellRow = this.targetCell.row;
    // const targetCellColumn = this.targetCell.column;
    return this.tableGridRectList.find((gridRect) => {
      return gridRect.rowIndex === row && gridRect.columnIndex === column;
    });
  }

  public onMouseMove() {
    const newRect = this.getMouseRect();
    if (!isEqual(newRect, this.mouseGridRect)) {
      if (newRect) {
        this.mouseGridRect = newRect;
        this.setMaskBoxStatus();
      }
    }
  }
}
