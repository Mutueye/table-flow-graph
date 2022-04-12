import './index.scss';
import { renderTable } from './lib/renderGraph';
import { TFGraphOptions } from './types';

export class TableFlowGraph {
  public element: HTMLElement;
  public isAlive: boolean;

  constructor(element: HTMLElement, options: TFGraphOptions) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    if (!element || !element.nodeName) {
      throw new Error('no element is specified to initialize TableFlowGraph');
    }

    this.element = element;

    console.log('options:::::::', options);

    renderTable(options, this.element);
    this.isAlive = true;
  }

  update() {
    if (!this.isAlive) {
      return;
    }
  }

  destroy() {
    if (!this.isAlive) {
      return;
    }

    this.isAlive = false;
  }
}
