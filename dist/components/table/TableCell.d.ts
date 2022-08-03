import { TableFlowGraph } from '../../index';
import { TFGraphNode } from '../../types';
import Button from '../ui/button/Button';
/**
 * table-flow-graph tabel cell
 */
export default class TableCell {
    graphInstance: TableFlowGraph;
    element: HTMLElement;
    nodeEl: HTMLElement;
    controlLayer: HTMLElement;
    nodeData?: TFGraphNode;
    hasNode: boolean;
    row: number;
    column: number;
    rowSpan: number;
    colSpan: number;
    isTarget: boolean;
    deleteRowBtn: Button;
    deleteColBtn: Button;
    constructor(parentElement: HTMLElement, data: TFGraphNode | null, row: number, column: number, graphInstance: TableFlowGraph);
    createTabelCell(data: TFGraphNode | null, row: any, column: any, graphInstance: TableFlowGraph): HTMLElement;
    setEditControls(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    setIsTarget(isTarget: boolean): void;
}
