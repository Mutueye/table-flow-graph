import { TableFlowGraph } from '../../index';
import TableCell from './TableCell';
import TableHeaderCell from './TableHeaderCell';
import TableMask from './TableMask';
/**
 * table-flow-graph tabel
 */
export default class Table {
    graphInstance: TableFlowGraph;
    element: HTMLElement;
    bottomControlEL: HTMLElement | null;
    cells: TableCell[];
    headerCells: TableHeaderCell[];
    canDeleteColumn: boolean;
    canDeleteRow: boolean;
    occupiedList: number[][];
    tableMask: TableMask;
    isMovingCell: boolean;
    isResizingCell: boolean;
    constructor(graphInstance: TableFlowGraph);
    private initTableStatus;
    renderTable(): void;
    setControls(): void;
    getMinRowSpanCell(row: number, minRowSpan?: number): TableCell;
    onMouseMove(): void;
    startMoving(targetCell: TableCell): void;
    stopMoving(): void;
    startResizing(targetCell: TableCell): void;
    stopResizing(): void;
    submitCellChange(): void;
    setBottomControl(): void;
    createHeader(): void;
    createTds(): void;
    createCells(): void;
}
