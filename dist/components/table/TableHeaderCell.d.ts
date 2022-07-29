import { TableFlowGraph } from '../../index';
import { TFGraphColumn } from '../../types';
import Popup from '../ui/popup/Popup';
/**
 * table-flow-graph tabel header cell
 */
export default class TableHeaderCell {
    graphInstance: TableFlowGraph;
    element: HTMLElement;
    columnIndex: number;
    isLast: boolean;
    columnData: TFGraphColumn;
    canDelete: boolean;
    canAdd: boolean;
    popMenu: Popup | null;
    controlLayer: HTMLElement;
    constructor(parentElement: HTMLElement, columnData: TFGraphColumn, columnIndex: number, graphInstance: TableFlowGraph);
    createElement(parentElement: HTMLElement): HTMLElement;
    setEditControls(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
}
