import { TableFlowGraph } from '../../index';
import { TFGraphNode } from '../../types';
import Button from '../ui/button/Button';
import Popup from '../ui/popup/Popup';
import EditNodeDialog from './EditNodeDialog';
/**
 * table-flow-graph tabel cell
 */
export default class TableCell {
    graphInstance: TableFlowGraph;
    element: HTMLElement;
    nodeEl: HTMLElement;
    controlLayer: HTMLElement;
    popup: Popup;
    nodeData?: TFGraphNode;
    hasNode: boolean;
    row: number;
    column: number;
    rowSpan: number;
    colSpan: number;
    isTarget: boolean;
    deleteRowBtn: Button;
    deleteColBtn: Button;
    editDialog: EditNodeDialog | null;
    constructor(parentElement: HTMLElement, data: TFGraphNode | null, row: number, column: number, graphInstance: TableFlowGraph);
    createTabelCell(data: TFGraphNode | null, row: any, column: any, graphInstance: TableFlowGraph): HTMLElement;
    setEditControls(): void;
    setViewModeControls(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    onClickNode(): void;
    setIsTarget(isTarget: boolean): void;
}
