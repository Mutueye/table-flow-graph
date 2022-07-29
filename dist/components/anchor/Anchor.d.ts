import { TableFlowGraph } from '../../index';
import { Bearing } from '../../types';
/**
 * Anchor point for drawing lines
 */
export default class Anchor {
    element: HTMLElement;
    bearing: Bearing;
    tr: HTMLElement;
    col: HTMLElement;
    isOffsetX: boolean;
    isOffsetY: boolean;
    id: string;
    posX: number;
    posY: number;
    hidden: boolean;
    constructor(bearing: Bearing, row: number, column: number, graphInstance: TableFlowGraph, isOffsetX?: boolean, isOffsetY?: boolean);
    setOnePosition(x: any, y: any): void;
    setVisible(visible: boolean): void;
    setPosition(): void;
}
