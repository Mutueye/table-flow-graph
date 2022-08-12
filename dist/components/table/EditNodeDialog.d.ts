import { TableFlowGraph } from '../..';
import Button from '../ui/button/Button';
import Dialog from '../ui/dialog/Dialog';
import TableCell from './TableCell';
export default class EditNodeDialog {
    dialog: Dialog | null;
    targetCell: TableCell;
    title: string;
    graphInstance: TableFlowGraph;
    contentElement: HTMLElement;
    nodeNameInput: HTMLInputElement;
    btnConfirm: Button;
    btnCancel: Button;
    isEdit: boolean;
    constructor(targetCell: TableCell, graphInstance: TableFlowGraph);
    setIsEdit(): void;
    renderContent(): void;
    show(): void;
}
