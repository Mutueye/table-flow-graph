import { TableFlowGraph } from '../..';
import { HintType } from '../../types';
export default class HintManager {
    targetEl: HTMLElement;
    currentHintState: HintType;
    graphInstance: TableFlowGraph;
    constructor(targetEl: HTMLElement, graphInstance: TableFlowGraph);
    setHint(hintState: HintType): void;
}
