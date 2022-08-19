import { TableFlowGraph, HintType } from '../../index';
export default class HintManager {
    targetEl: HTMLElement;
    currentHintState: HintType;
    graphInstance: TableFlowGraph;
    constructor(targetEl: HTMLElement, graphInstance: TableFlowGraph);
    setHint(hintState: HintType): void;
}
