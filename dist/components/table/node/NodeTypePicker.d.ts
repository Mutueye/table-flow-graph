import { NodeType } from '../../..';
export interface NodeTypePickerOption {
    parentEl: HTMLElement;
    initialType: NodeType;
    onChange: (type: NodeType) => void;
}
export default class NodeTypePicker {
    currentType: NodeType;
    element: HTMLElement;
    private option;
    private btnList;
    constructor(option: NodeTypePickerOption);
    private clickType;
    setActiveType(): void;
}
