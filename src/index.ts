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

  constructor(options: TFGraphOptions) {
    if (typeof options.parentElement === 'string') {
      options.parentElement = document.querySelector(options.parentElement);
    }

    if (!options.parentElement || !options.parentElement.nodeName) {
      throw new Error('no element is specified to initialize TableFlowGraph');
    }

    this.element = createClassElement('div', 'tfgraph', options.parentElement);
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
