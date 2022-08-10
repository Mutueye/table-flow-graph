/**
 * table-flow-graph dialog
 */
export default class Dialog {
    targetElement: HTMLElement;
    element: HTMLElement;
    maskElement: HTMLElement;
    boxElement: HTMLElement;
    constructor(targetElement: HTMLElement);
    close(): void;
}
