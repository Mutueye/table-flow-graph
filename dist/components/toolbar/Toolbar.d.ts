import { TableFlowGraph } from '../../index';
import Button from '../ui/button/Button';
import Toggler from '../ui/toggler/Toggler';
import EditColumnDialog from '../table/EditColumnDialog';
/**
 * table-flow-graph toolbar
 */
export default class Toolbar {
    element: HTMLElement;
    graphInstance: TableFlowGraph;
    disabledMask: HTMLElement;
    modeToggler: Toggler;
    newColumnBtn: Button;
    addColDialog: EditColumnDialog;
    constructor(parentElement: HTMLElement, graphInstance: TableFlowGraph);
    addColumn(): void;
    disable(): void;
    enable(): void;
    setToolbarState(): void;
}
