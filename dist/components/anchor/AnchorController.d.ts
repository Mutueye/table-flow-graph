import { TableFlowGraph } from '../../index';
import TableCell from '../table/TableCell';
import Anchor from './Anchor';
/**
 * table-flow-graph anchor controller
 */
export default class AnchorController {
    element: HTMLElement;
    anchors: Anchor[];
    hoveredAnchor: Anchor;
    graphInstance: TableFlowGraph;
    constructor(graphInstance: TableFlowGraph);
    renderAnchors(): void;
    setHoveredAnchor(anchor: Anchor | undefined): void;
    resetPosition(): void;
    setAnchorsVisible(visible: boolean): void;
    createAnchors(cell: TableCell): void;
}
