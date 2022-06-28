import './styles/index.scss';
import { createClassElement } from './lib/dom';
import {
  renderLineGroup,
  renderAnchorsLayer,
  renderLinesLayer,
  renderTable,
} from './lib/renderTools';
import { Mode, TFGraphOptions } from './types';
import TFGraphCell from './components/TFGraphCell';
import TFGraphAnchor from './components/TFGraphAnchor';
import TFGraphToolbar from './components/TFGraphToolbar';
// import { debounce } from './lib/utils';

export class TableFlowGraph {
  public element: HTMLElement;
  public options: TFGraphOptions;
  public id: string;
  public cells: TFGraphCell[];
  public anchors: TFGraphAnchor[];
  public toolbar: TFGraphToolbar;
  public linesLayer: HTMLElement;
  public anchorsLayer: HTMLElement;
  public isAlive: boolean;
  public mode: Mode;

  constructor(el: HTMLElement, options: TFGraphOptions) {
    if (!el) {
      throw new Error('no element is specified to initialize TableFlowGraph');
    }

    // use id as unique key, to support multiple table-flow-graph instances in one page.
    if (el.getAttribute('id')) {
      this.id = el.getAttribute('id');
    } else {
      this.id = 'id' + (Math.random() * 100000).toFixed(0);
    }

    // init options
    this.options = options;
    if (typeof this.options.rows !== 'undefined') this.options.totalRows = this.options.rows.length;
    if (typeof this.options.columns !== 'undefined')
      this.options.totalColumns = this.options.columns.length;
    // this.options.mode = options.mode ? options.mode : 'view';

    // create toolbar and edit state
    if (this.options.isEditor) {
      this.mode = 'edit';
      this.toolbar = new TFGraphToolbar(el, this);
    } else {
      this.mode = 'preview';
    }

    // root container element
    this.element = createClassElement('div', 'tfgraph', el);
    this.cells = [];
    this.anchors = [];

    this.render();

    // resize trigger render
    // if (this.options.refreshOnResize) {
    //   window.addEventListener(
    //     'resize',
    //     debounce(() => this.render(), 500),
    //     false,
    //   );
    // }

    window.addEventListener('resize', this, false);

    this.isAlive = true;
  }

  render() {
    this.element.innerHTML = '';
    this.linesLayer = renderLinesLayer(this);
    // if (this.options.mode === 'edit') {
    this.anchorsLayer = renderAnchorsLayer(this);
    // render chart
    renderTable(this);

    setTimeout(
      () =>
        renderLineGroup(this.linesLayer, [
          this.anchors[0],
          this.anchors[24],
          this.anchors[28],
          this.anchors[32],
        ]),
      100,
    );
  }

  public changeMode(mode: Mode) {
    if (this.mode !== mode) {
      this.mode = mode;
      this.anchors.forEach((anchor: TFGraphAnchor) => {
        anchor.setVisible(mode === 'edit');
      });
    }
  }

  // handle addEventListener events
  handleEvent(event) {
    switch (event.type) {
      case 'resize':
        this.onResize();
        break;
      default:
        break;
    }
  }

  onResize() {
    if (this.anchors && this.anchors.length > 0) {
      this.anchors.forEach((anchor) => {
        anchor.setPosition();
      });
    }
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

    window.removeEventListener('resize', this, false);
    this.isAlive = false;
  }
}
