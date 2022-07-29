import { TooltipOptoins } from '../../../types';
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
    timeoutId: number | null;
    constructor(targetElement: HTMLElement, options: TooltipOptoins);
    render(): void;
    dismiss(): void;
    mouseEnter(): void;
    mouseLeave(): void;
}
