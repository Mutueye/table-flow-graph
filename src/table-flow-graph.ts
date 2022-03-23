import { div } from './lib/dom';
import './scss/styles.scss';

export interface FlowGraphColumn {
  title: string;
  width: string;
}
export interface FlowGraphOptions {
  columns: FlowGraphColumn[];
}

export class TableFlowGraph {
  public element: HTMLElement;
  public isAlive: boolean;

  constructor(element: HTMLElement, options: FlowGraphOptions) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    if (!element || !element.nodeName) {
      throw new Error('no element is specified to initialize GridFlow');
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
