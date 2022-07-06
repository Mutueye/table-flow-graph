import './styles/index.scss';
import { createClassElement } from './lib/dom';
import { Mode, Position, TFGraphOptions } from './types';
import Anchor from './components/Anchor';
import Toolbar from './components/Toolbar';
// import LineGroup from './components/LineGroup';
import TableController from './components/TableController';
import LineController from './components/LineController';
import AnchorController from './components/AnchorController';
// import { debounce } from './lib/utils';

export class TableFlowGraph {
  public element: HTMLElement;
  public options: TFGraphOptions;
  public id: string;
  public anchors: Anchor[];
  public toolbar: Toolbar;
  public isAlive: boolean;
  public mode: Mode;
  public mousePosition: Position;
  public hoveredAnchor: Anchor; // current Anchor that mouse hoverd
  public tableController: TableController;
  public lineController: LineController;
  public anchorController: AnchorController;

  constructor(el: HTMLElement, options: TFGraphOptions) {
    if (!el) {
      throw new Error('no element is specified to initialize TableFlowGraph');
    }

    this.load(el, options);

    // resize trigger render
    // if (this.options.refreshOnResize) {
    //   window.addEventListener(
    //     'resize',
    //     debounce(() => this.render(), 500),
    //     false,
    //   );
    // }

    window.addEventListener('resize', this, false);
    window.addEventListener('keydown', this, false);
    this.element.addEventListener('mousemove', this, false);

    this.isAlive = true;
  }

  public load(el: HTMLElement, options: TFGraphOptions) {
    // use id as unique key, to support multiple table-flow-graph instances in one page.
    if (el.getAttribute('id')) {
      this.id = el.getAttribute('id');
    } else {
      this.id = 'id' + (Math.random() * 100000).toFixed(0);
    }

    el.innerHTML = '';

    this.options = options;
    if (typeof this.options.rows !== 'undefined') {
      this.options.totalRows = this.options.rows.length;
    }
    if (typeof this.options.columns !== 'undefined') {
      this.options.totalColumns = this.options.columns.length;
    }

    // create toolbar and edit state
    if (this.options.isEditor) {
      this.mode = 'edit';
      this.toolbar = new Toolbar(el, this);
    } else {
      this.mode = 'preview';
    }

    // root container element
    this.element = createClassElement('div', 'tfgraph', el);
    this.lineController = new LineController(this);
    this.anchorController = new AnchorController(this);
    this.tableController = new TableController(this);
    this.anchors = [];

    this.render();
  }

  public render() {
    // render table
    this.tableController.renderTable();
    // render lines
    setTimeout(() => {
      this.lineController.renderLines();
    }, 100);
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
      case 'keydown':
        this.onKeydown(event);
        break;
      default:
        break;
    }
  }

  onMourseMove(event) {
    const rect = this.element.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    this.mousePosition = { x: offsetX, y: offsetY };
    this.lineController.onMouseMove();
  }

  onResize() {
    if (this.anchors && this.anchors.length > 0) {
      this.anchors.forEach((anchor) => {
        anchor.setPosition();
      });
    }
  }

  onKeydown = (e) => {
    // console.group('keyboard event');
    // console.log('event', e);
    // console.log('event.code', e.code);
    // console.log('event.key', e.key);
    // console.log('event.altKey', e.altKey);
    // console.log('event.ctrlKey', e.ctrlKey);
    // console.log('event.shiftKey', e.shiftKey);
    // console.log('event.metaKey', e.metaKey);
    // console.log('event.getModifierState()', e.getModifierState('Alt'));
    // console.groupEnd();
    if (e.code === 'Enter') {
      if (this.lineController.isDrawingLine) {
        this.lineController.endDrawLine();
      }
    } else if (e.code === 'Escape') {
      if (this.lineController.isDrawingLine) {
        this.lineController.currentDrawingLine.escapeDrawing();
      }
    }
  };

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
    this.element.removeEventListener('mousemove', this, false);
    this.isAlive = false;
  }

  public setHoveredAnchor(anchor: Anchor | undefined) {
    this.hoveredAnchor = anchor;
  }

  public changeMode(mode: Mode) {
    if (this.mode !== mode) {
      this.mode = mode;
      this.anchors.forEach((anchor: Anchor) => {
        anchor.setVisible(mode === 'edit');
      });
    }
  }

  // TODO press 'enter' or 'space' to end drawing line
  // TODO press 'esc' to delete last line anchor point
}
