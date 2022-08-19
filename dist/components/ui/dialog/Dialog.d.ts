import { DialogOptions } from '../../../index';
/**
 * table-flow-graph dialog
 */
export default class Dialog {
    targetElement: HTMLElement;
    element: HTMLElement;
    maskElement: HTMLElement;
    boxElement: HTMLElement;
    titleBarElement: HTMLElement;
    closeBtnElement: HTMLElement;
    title: string;
    constructor(options: DialogOptions);
    renderTitleBar(): void;
    close(): void;
}
