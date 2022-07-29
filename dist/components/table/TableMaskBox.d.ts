import { TableFlowGraph } from '../../index';
import { PositionAndSize } from '../../types';
import TableCell from './TableCell';
/**
 * table-flow-graph anchor controller
 */
export default class TableMaskBox {
    graphInstance: TableFlowGraph;
    element: HTMLElement;
    disabled: boolean;
    constructor(parentEl: HTMLElement, targetCell: TableCell, graphInstance: TableFlowGraph);
    setPositinAndSize(pos_size: PositionAndSize): void;
    disable(): void;
    enable(): void;
}
