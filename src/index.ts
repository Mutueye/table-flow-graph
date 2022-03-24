import { div } from './lib/dom';
import './scss/styles.scss';

import { TFGraphColumn, TFGraphRow, TFGraphNode } from './types';

export interface TFGraphOptions {
  columns?: TFGraphColumn[];
  rows?: TFGraphRow[];
  nodes: TFGraphNode[];
  // if have rows data, will use rows.length instead of this prop.
  totalRows?: number;
  // if have columns data, will use columns.length instead of this prop.
  totalColumns?: number;
}

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

    div('graph-container', this.element);

    // element.classList.add(cls.main);

    // this.settings = defaultSettings();
    // for (const key in userSettings) {
    //   this.settings[key] = userSettings[key];
    // }
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
