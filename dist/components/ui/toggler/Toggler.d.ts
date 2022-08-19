import { TogglerOptions, TogglerButton } from '../../../index';
/**
 * table-flow-graph toggler btn group
 */
export default class Toggler {
    element: HTMLElement;
    indicatorEl: HTMLElement;
    btnContainerEl: HTMLElement;
    disabled: boolean;
    activeIndex: number;
    btnList: TogglerButton[];
    constructor(parentElement: HTMLElement, options: TogglerOptions);
    setActive(index: number): void;
    setActiveIndicator(): void;
    setDisabled(): void;
    setEnabled(): void;
}
