import { TableFlowGraph } from '../../index';
import { LineGroupOptions, Position } from '../../types';
import Anchor from '../anchor/Anchor';
import LineSegment from './LineSegment';
/**
 * table-flow-graph line group
 */
export default class LineGroup {
    element: HTMLElement;
    isDrawingActive: boolean;
    anchorIds: string[];
    anchors: Anchor[];
    cursorLine: LineSegment;
    lines: LineSegment[];
    cursorLineStartPosition: Position;
    graphInstance: TableFlowGraph;
    hovered: boolean;
    constructor(parentElement: HTMLElement, options: LineGroupOptions, graphInstance: TableFlowGraph);
    addLineSegment(anchorId: any): void;
    onDoubleClick(): void;
    drawLines(): void;
    setHovered(hovered?: boolean): void;
    endDrawing(): void;
    escapeDrawing(): void;
    onMouseMove(graphInstance: TableFlowGraph): void;
}
