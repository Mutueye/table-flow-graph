import { TableFlowGraph } from '../../index';
import Button from '../ui/button/Button';
import Dialog from '../ui/dialog/Dialog';
import TableHeaderCell from './TableHeaderCell';
export default class EditColumnDialog {
    dialog: Dialog | null;
    targetHeaderCell: TableHeaderCell;
    title: string;
    graphInstance: TableFlowGraph;
    contentElement: HTMLElement;
    inputEl: HTMLInputElement;
    btnConfirm: Button;
    btnCancel: Button;
    isEdit: boolean;
    constructor(graphInstance: TableFlowGraph, targetHeaderCell?: TableHeaderCell);
    setIsEdit(): void;
    renderContent(): void;
    show(): void;
}
