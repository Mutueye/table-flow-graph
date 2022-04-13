import TFGraphCell from './components/TFGraphCell';
import './index.scss';
import { createClassElement } from './lib/dom';
import { renderTable } from './lib/renderGraph';
import { renderLines } from './lib/renderLines';
import { TFGraphOptions } from './types';

export class TableFlowGraph {
  public element: HTMLElement;
  public cells: TFGraphCell[];
  public options: TFGraphOptions;
  public isAlive: boolean;

  constructor(element: HTMLElement, options: TFGraphOptions) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    if (!element || !element.nodeName) {
      throw new Error('no element is specified to initialize TableFlowGraph');
    }

    this.element = createClassElement('div', 'tfgraph', element);
    this.cells = [];
    this.options = options;
    this.options.mode = options.mode ? options.mode : 'view';

    renderTable(this);
    renderLines(this);
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
