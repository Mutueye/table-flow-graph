import { TableFlowGraph, CellPositionAndSize, TableGridRect } from '../../index';
import TableCell from './TableCell';
import TableMaskBox from './TableMaskBox';
/**
 * table-flow-graph anchor controller
 */
export default class TableMask {
    graphInstance: TableFlowGraph;
    maskBox: TableMaskBox;
    element: HTMLElement;
    tableGridRectList: TableGridRect[];
    mouseGridRect: TableGridRect;
    targetCell: TableCell;
    targetCellRect: TableGridRect;
    resultCellPositionAndSize: CellPositionAndSize;
    filteredOccupiedList: number[][];
    constructor(tableGridRectList: TableGridRect[], graphInstance: TableFlowGraph);
    private showMask;
    private setFilteredOccupiedList;
    private setMaskBoxStatus;
    startMask(targetTableCell: TableCell): void;
    stopMask(): void;
    submitChange(): void;
    private getMouseRect;
    private getRectByRowAndColumn;
    onMouseMove(): void;
}
