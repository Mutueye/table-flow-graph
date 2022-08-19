import { TableFlowGraph, HintType } from '../../index';

export default class HintManager {
  public targetEl: HTMLElement;
  public currentHintState: HintType;
  public graphInstance: TableFlowGraph;

  constructor(targetEl: HTMLElement, graphInstance: TableFlowGraph) {
    this.targetEl = targetEl;
    this.graphInstance = graphInstance;
    this.currentHintState = 'idel';
    this.targetEl.innerText = '';
  }

  setHint(hintState: HintType) {
    this.currentHintState = hintState;
    switch (this.currentHintState) {
      case 'idel':
        this.targetEl.innerText = '';
        break;
      case 'drawLine':
        this.targetEl.innerText = this.graphInstance.options.labels.hint_drawLine;
        break;
      case 'hoverLine':
        this.targetEl.innerText = this.graphInstance.options.labels.hint_hoverLine;
        break;
      case 'hoverAnchor':
        this.targetEl.innerText = this.graphInstance.options.labels.hint_hoverAnchor;
        break;
      case 'moveNode':
        this.targetEl.innerText = this.graphInstance.options.labels.hint_moveNode;
        break;
      case 'resizeNode':
        this.targetEl.innerText = this.graphInstance.options.labels.hint_resizeNode;
        break;
      default:
        this.targetEl.innerText = '';
        break;
    }
  }
}
