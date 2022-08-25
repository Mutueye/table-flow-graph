import { NodeType } from '../../..';
export interface NodeTypeBtnOption {
    parentEl: HTMLElement;
    type: NodeType;
    onClick: (type: NodeType) => void;
}
export declare class NodeTypeBtn {
    element: HTMLElement;
    type: NodeType;
    active: boolean;
    private nodeEl;
    private icon;
    private hovered;
    private option;
    constructor(option: NodeTypeBtnOption);
    private createNodeTypeBtn;
    private toggleHover;
    toggleActive(active: boolean): void;
}
