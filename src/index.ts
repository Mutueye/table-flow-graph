import './styles/index.scss';
import { createClassElement } from './lib/dom';
import { renderAnchorsLayer, renderLinesLayer, renderTable } from './lib/renderTools';
import { Mode, Position, TFGraphOptions } from './types';
import TFGraphCell from './components/TFGraphCell';
import TFGraphAnchor from './components/TFGraphAnchor';
import TFGraphToolbar from './components/TFGraphToolbar';
import TFGraphLineGroup from './components/TFGraphLineGroup';
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
  public mousePosition: Position;
  public lineAnchorIds: string[][];
  public isDrawingLine: boolean;
  public currentDrawingLine: TFGraphLineGroup;

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
    if (this.options.lines && Array.isArray(this.options.lines)) {
      this.lineAnchorIds = this.options.lines;
    } else {
      this.lineAnchorIds = [
        [
          'anchor_1_0_topright_normalx_offsety',
          'anchor_0_0_bottomright_normalx_normaly',
          'anchor_0_2_bottomright_normalx_normaly',
          'anchor_1_2_bottomright_normalx_normaly',
          'anchor_3_3_top_normalx_offsety',
        ],
        [
          'anchor_3_2_bottom_normalx_offsety',
          'anchor_5_2_center_normalx_normaly',
          'anchor_5_4_left_offsetx_normaly',
        ],
      ];
    }

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
    this.element.addEventListener('mousemove', this, false);

    this.isAlive = true;
  }

  // handle addEventListener events
  handleEvent(event) {
    switch (event.type) {
      case 'resize':
        this.onResize();
        break;
      case 'mousemove':
        this.onMourseMove(event);
        break;
      default:
        break;
    }
  }

  render() {
    this.element.innerHTML = '';
    this.linesLayer = renderLinesLayer(this);
    // if (this.options.mode === 'edit') {
    this.anchorsLayer = renderAnchorsLayer(this);
    // render chart
    renderTable(this);

    setTimeout(() => {
      this.lineAnchorIds.forEach((lineGroup) => {
        new TFGraphLineGroup(
          this.linesLayer,
          { anchorIds: lineGroup, isDrawingActive: false },
          this,
        );
      });
    }, 100);
  }

  onMourseMove(event) {
    const rect = this.element.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    this.mousePosition = { x: offsetX, y: offsetY };
    // console.log('event:::::::::', offsetX, offsetY);
    if (this.isDrawingLine && this.currentDrawingLine) {
      this.currentDrawingLine.onMouseMove(this);
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

  public changeMode(mode: Mode) {
    if (this.mode !== mode) {
      this.mode = mode;
      this.anchors.forEach((anchor: TFGraphAnchor) => {
        anchor.setVisible(mode === 'edit');
      });
    }
  }

  public createLineGroup(anchorId) {
    this.lineAnchorIds.push([anchorId]);
    this.isDrawingLine = true;
    this.currentDrawingLine = new TFGraphLineGroup(
      this.linesLayer,
      { anchorIds: [anchorId], isDrawingActive: true },
      this,
    );
  }

  public addLineSegment(anchorId) {
    if (this.isDrawingLine && this.currentDrawingLine) {
      this.currentDrawingLine.addLineSegment(anchorId);
    }
  }

  // TODO press 'enter' or 'space' to end drawing line
  // TODO press 'esc' to delete last line anchor point
}
