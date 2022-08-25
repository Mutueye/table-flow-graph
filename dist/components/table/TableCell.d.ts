import { TableFlowGraph, TFGraphNode } from '../../index';
import Button from '../ui/button/Button';
import EditNodeDialog from './node/EditNodeDialog';
import Node from './node/Node';
/**
 * table-flow-graph tabel cell
 */
export default class TableCell {
    graphInstance: TableFlowGraph;
    element: HTMLElement;
    controlLayer: HTMLElement;
    node: Node;
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
    createTabelCell(data: TFGraphNode | null, row: any, column: any, parentElement: any): void;
    setEditorControls(): void;
    setViewerControls(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    setIsTarget(isTarget: boolean): void;
}
