import { TooltipOptoins } from '../../../index';
/**
 * table-flow-graph popup
 */
export default class Tooltip {
    targetElement: HTMLElement;
    options: TooltipOptoins;
    element: HTMLElement;
    areaElement: HTMLElement;
    boxElement: HTMLElement;
    arrowElement: HTMLElement;
    disabled: boolean;
    rendered: boolean;
    dismissTimeoutId: number | null;
    showTimeoutId: number | null;
    constructor(targetElement: HTMLElement, options: TooltipOptoins);
    render(): void;
    dismiss(): void;
    mouseEnter(): void;
    mouseLeave(): void;
}
