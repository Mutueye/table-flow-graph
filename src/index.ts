import './styles/index.scss';
import { createClassElement, setStyles } from './lib/dom';
import { debounce } from './lib/utils';
import { Mode, Position, TFGraphOptions } from './types';
import Toolbar from './components/toolbar/Toolbar';
import TableController from './components/table/TableController';
import LineController from './components/line/LineController';
import AnchorController from './components/anchor/AnchorController';

// default options
const defaultOptions: TFGraphOptions = {
  totalColumns: 8,
  totalRows: 8,
  maxColumns: 12,
  maxRows: 30,
  labels: {
    editMode: 'Edit Mode',
    previewMode: 'Preview Mode',
    editColumn: 'Edit Column',
    addColumn: 'Add Column',
    deleteColumn: 'Delete Column',
    addRow: 'Add Row',
    deleteRow: 'Delete Row',
    editNode: 'Edit Node',
    addNode: 'Add Node',
    deleteNode: 'Delete Node',
    adjustNodeSize: 'Adjust Node Size',
    moveNode: 'Move Node',
  },
};

export class TableFlowGraph {
  public element: HTMLElement;
  public baseElement: HTMLElement;
  public options: TFGraphOptions;
  public id: string;
  public toolbar: Toolbar;
  public isAlive: boolean;
  public hasTableHeader: boolean;
  public mode: Mode;
  public mousePosition: Position;
  public tableController: TableController;
  public lineController: LineController;
  public anchorController: AnchorController;

  constructor(el: HTMLElement, options: TFGraphOptions) {
    if (!el) {
      throw new Error('no element is specified to initialize TableFlowGraph');
    } else {
      this.baseElement = el;
    }

    // use id as unique key, to support multiple table-flow-graph instances in one page.
    if (this.baseElement.getAttribute('id')) {
      this.id = this.baseElement.getAttribute('id');
    } else {
      this.id = 'id' + (Math.random() * 100000).toFixed(0);
    }

    this.init(options);

    window.addEventListener('resize', this, false);
    window.addEventListener('keydown', this, false);
    window.addEventListener('mousemove', this, false);

    this.isAlive = true;
  }

  public init(options: TFGraphOptions) {
    this.baseElement.innerHTML = '';

    this.options = Object.assign({}, defaultOptions, options);
    if (options.labels) {
      this.options.labels = Object.assign({}, defaultOptions.labels, options.labels);
    }
    if (typeof this.options.rows !== 'undefined') {
      this.options.totalRows = this.options.rows.length;
    }
    if (this.options.columns && this.options.columns.length > 0) {
      this.options.totalColumns = this.options.columns.length;
    }
    if (!this.options.columns || this.options.columns.length === 0) {
      this.options.columns = [];
      this.hasTableHeader = false;
      for (let i = 0; i < this.options.totalColumns; i++) {
        this.options.columns.push({
          width: 'auto',
        });
      }
    } else {
      this.hasTableHeader = true;
    }
    if (this.options.totalRows > this.options.maxRows) {
      this.options.totalRows = this.options.maxRows;
    }
    if (this.options.totalColumns > this.options.maxColumns) {
      this.options.totalColumns = this.options.maxColumns;
    }

    // create toolbar and edit state
    if (this.options.isEditor) {
      this.mode = 'edit';
      this.toolbar = new Toolbar(this.baseElement, this);
    } else {
      this.mode = 'preview';
    }

    // create root dom elements and controllers
    this.element = createClassElement('div', 'tfgraph', this.baseElement);
    if (this.mode === 'edit') this.element.classList.add('edit');
    this.lineController = new LineController(this);
    this.anchorController = new AnchorController(this);
    this.tableController = new TableController(this);

    this.render();
  }

  public render() {
    // render table
    this.tableController.renderTable();
    // render anchors
    this.anchorController.renderAnchors();
    // render lines
    this.lineController.renderLines();
  }

  handleResize = () => {
    // TODO detailed resize management
    // this.anchorController.resetPosition();
    this.refresh();
  };
  debouncedHandleResize = debounce(this.handleResize, 500);

  // handle addEventListener events
  handleEvent(event) {
    switch (event.type) {
      case 'resize':
        this.debouncedHandleResize();
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
    this.tableController.onMouseMove();
  }

  onKeydown = (e) => {
    if (e.code === 'Enter') {
      // press enter to finish drawing line
      if (this.lineController.isDrawingLine) {
        this.lineController.endDrawLine();
      }
    } else if (e.code === 'Escape') {
      // press esc to cancel last anchor point when drawing line
      if (this.lineController.isDrawingLine) {
        this.lineController.currentDrawingLine.escapeDrawing();
      }
      if (this.tableController.isMovingCell) {
        this.tableController.stopMoving();
      }
      if (this.tableController.isResizingCell) {
        this.tableController.stopResizing();
      }
    }
  };

  public refresh(options?: TFGraphOptions) {
    if (!this.isAlive) {
      return;
    } else {
      setTimeout(() => {
        const height = this.baseElement.getBoundingClientRect().height;
        // maintain consistent height when rerendering dom elements
        setStyles(this.baseElement, { height: height + 'px' });
        this.init(options ? options : this.options);
        setStyles(this.baseElement, { height: 'auto' });
      });
    }
  }

  public destroy() {
    if (!this.isAlive) {
      return;
    }

    window.removeEventListener('resize', this, false);
    window.removeEventListener('keydown', this, false);
    window.removeEventListener('mousemove', this, false);

    this.isAlive = false;
  }

  public changeMode(mode: Mode) {
    if (this.mode !== mode) {
      this.mode = mode;
      if (mode === 'edit') {
        this.element.classList.add('edit');
      } else {
        this.element.classList.remove('edit');
      }
      this.anchorController.setAnchorsVisible(mode === 'edit');
      this.tableController.renderTable();
    }
  }
}
