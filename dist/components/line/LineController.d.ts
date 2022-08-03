import { TableFlowGraph } from '../../index';
import LineGroup from './LineGroup';
/**
 * table-flow-graph lines controller
 */
export default class LineController {
    element: HTMLElement;
    lineAnchorIds: string[][];
    originLineAnchorIds: string[][];
    isDrawingLine: boolean;
    currentDrawingLine: LineGroup;
    graphInstance: TableFlowGraph;
    canDeleteColumn: boolean;
    canDeleteRow: boolean;
    constructor(graphInstance: TableFlowGraph);
    renderLines(): void;
    startDrawLine(): void;
    endDrawLine(): void;
    setColAndRowDeletable(): void;
    onChangeLines(): void;
    removeLineGroup(line: LineGroup): void;
    createLineGroup(anchorId: any): void;
    addLineSegment(anchorId: any): void;
    onMouseMove(): void;
}
