import { NodeType, TableFlowGraph } from '../../../index';
import TableCell from '../TableCell';
/**
 * table-flow-graph node
 */
export default class Node {
    graphInstance: TableFlowGraph;
    element: HTMLElement;
    tableCell: TableCell;
    type: NodeType;
    private hoverd;
    constructor(cell: TableCell);
    createNode(): void;
    toggleHovered(hovered: boolean): void;
    setViewerControls(): void;
    onClickNode(): void;
}
