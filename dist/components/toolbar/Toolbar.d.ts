import { TableFlowGraph } from '../../index';
import Button from '../ui/button/Button';
import Toggler from '../ui/toggler/Toggler';
/**
 * table-flow-graph toolbar
 */
export default class Toolbar {
    element: HTMLElement;
    graphInstance: TableFlowGraph;
    disabledMask: HTMLElement;
    modeToggler: Toggler;
    newColumnBtn: Button;
    constructor(parentElement: HTMLElement, graphInstance: TableFlowGraph);
    addColumn(): void;
    disable(): void;
    enable(): void;
    setToolbarState(): void;
}
