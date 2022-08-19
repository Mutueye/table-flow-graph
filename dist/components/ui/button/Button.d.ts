import { BtnOptions } from '../../../index';
import Tooltip from '../tooltip/Tooltip';
/**
 * table-flow-graph button
 */
export default class Button {
    element: HTMLElement;
    disabled: boolean;
    btnToolTip: Tooltip;
    constructor(parentElement: HTMLElement, options: BtnOptions);
    setDisabled(): void;
    setEnabled(): void;
}
