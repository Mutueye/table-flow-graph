import { div } from './lib/dom';

export default class GridFlow {
  public element: HTMLElement;
  public isAlive: boolean;

  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    if (!element || !element.nodeName) {
      throw new Error('no element is specified to initialize GridFlow');
    }

    this.element = element;

    this.element.appendChild(div('grid-flow-container'));

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
