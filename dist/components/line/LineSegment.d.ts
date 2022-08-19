import { LineOptions, Position } from '../../index';
import LineGroup from './LineGroup';
/**
 * table-flow-graph line
 */
export default class LineSegment {
    element: HTMLElement;
    thickness: number;
    startPointEl: HTMLElement;
    endArrowEl: HTMLElement;
    constructor(parent: LineGroup, options: LineOptions);
    setHoverd(hovered?: boolean): void;
    drawLine(positionA: Position, positionB: Position): void;
    toggleStartPoint(): void;
    toggleEndArrow(): void;
}
