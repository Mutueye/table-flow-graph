import './styles/index.scss';
import { createClassElement } from './lib/dom';
import { renderAnchorsLayer, renderLinesLayer, renderTable } from './lib/renderGraph';
import { TFGraphOptions } from './types';
import TFGraphCell from './components/TFGraphCell';
import TFGraphAnchor from './components/TFGraphAnchor';

export class TableFlowGraph {
  public element: HTMLElement;
  public cells: TFGraphCell[];
  public anchors: TFGraphAnchor[];
  public options: TFGraphOptions;
  public isAlive: boolean;
  public id: string;
  public linesLayer: HTMLElement;
  public anchorsLayer: HTMLElement;

  constructor(options: TFGraphOptions) {
    if (!options.parentElement) {
      throw new Error('no element is specified to initialize TableFlowGraph');
    }

    // use id as unique key, to support multiple table-flow-graph instances in one page.
    if (options.parentElement.getAttribute('id')) {
      this.id = options.parentElement.getAttribute('id');
    } else {
      this.id = 'id' + (Math.random() * 100000).toFixed(0);
    }

    // root container element
    this.element = createClassElement('div', 'tfgraph', options.parentElement);
    this.cells = [];
    this.anchors = [];

    // init options
    this.options = options;
    this.options.mode = options.mode ? options.mode : 'view';
    if (typeof this.options.rows !== 'undefined') this.options.totalRows = this.options.rows.length;
    if (typeof this.options.columns !== 'undefined')
      this.options.totalColumns = this.options.columns.length;

    this.linesLayer = renderLinesLayer(this);
    if (this.options.mode === 'edit') {
      this.anchorsLayer = renderAnchorsLayer(this);
    }
    // render chart
    renderTable(this);

    window.addEventListener('resize', this, false);

    this.isAlive = true;
  }

  // handle addEventListener event
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
