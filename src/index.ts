import './styles/index.scss';
import { createClassElement, setStyles } from './lib/dom';
import { debounce } from './lib/utils';
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
    newNode: 'New Node',
    enterNodeName: 'Enter node name',
    enterColumnName: 'Enter column name',
    confirm: 'Confirm',
    cancel: 'Cancel',
    hint_drawLine:
      'Click another anchor to draw new line segment; press [ESC] to undo prev line segment; press [ENTER] or double click left mouse to finish drawing',
    hint_hoverLine: 'Double click to delete this line',
    hint_hoverAnchor: 'Click to start drawing lines',
    hint_moveNode: 'Move cursor to move this node, click left mouse to confrim moving',
    hint_resizeNode: 'Move cursor to resize this node, click left mouse to confrim resizing',
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
      this.baseElement.classList.add('tfgraph-wrapper');
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
    // set totalRows
    // if (typeof this.options.rows !== 'undefined') {
    //   this.options.totalRows = this.options.rows.length;
    // }
    // set totalColumns and hasTableHeader
    if (this.options.columns && this.options.columns.length > 0) {
      this.options.totalColumns = this.options.columns.length;
      this.hasTableHeader = true;
    } else {
      this.options.columns = [];
      this.hasTableHeader = false;
      for (let i = 0; i < this.options.totalColumns; i++) {
        this.options.columns.push({
          width: 'auto',
        });
      }
    }

    // restrain totalRows and totalColumns
    if (this.options.totalRows > this.options.maxRows) {
      this.options.totalRows = this.options.maxRows;
    }
    if (this.options.totalColumns > this.options.maxColumns) {
      this.options.totalColumns = this.options.maxColumns;
    }

    // filter nodes that exceeds totalRows and totalColumns
    if (this.options.nodes && this.options.nodes.length > 0) {
      this.options.nodes = this.options.nodes.filter(
        (node) =>
          node.row + node.rowSpan - 1 <= this.options.totalRows &&
          node.column + node.colSpan - 1 <= this.options.totalColumns,
      );
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

    // wait for table render ready; TODO set anchor position relative to table cells
    setTimeout(() => {
      // render anchors
      this.anchorController.renderAnchors();
      // render lines
      this.lineController.renderLines();
    }, 1);
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

export type ColumnWidth = 'auto' | 'lg' | 'md' | 'sm' | 'xs';

// table column header data
export interface TFGraphColumn {
  id?: string;
  title?: string;
  width?: ColumnWidth | string;
}

// table row header data
export interface TFGraphRow {
  id?: string;
  title: string;
}

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type ColorValue = RGB | RGBA | HEX;

export type Color =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'gray'
  | 'black'
  | 'white';

export type FunctionalColor = 'primary' | 'success' | 'info' | 'warning' | 'danger';

export type NodeType = 'default' | FunctionalColor;

export type NodeStyleType = {
  [K in NodeType]: {
    type: K;
    normalStyle?: Partial<CSSStyleDeclaration>;
    hoverStyle?: Partial<CSSStyleDeclaration>;
  };
};

// node data
export interface TFGraphNode {
  id: string | number;
  title: string;
  row: number;
  column: number;
  colSpan: number;
  rowSpan: number;
  type?: NodeType;
  isBtn?: boolean;
  meta?: Record<string, unknown>;
  showPopup?: boolean;
}

// export interface ThemeOption {
//   borderColor: string;
//   titleColor: string;
//   backgroundColor: string;
// }

// export interface Theme {
//   default: ThemeOption;
//   success: ThemeOption;
//   warning: ThemeOption;
//   danger: ThemeOption;
//   primary: ThemeOption;
// }

export type Mode = 'edit' | 'preview';

// labels for ui
export type Labels = {
  editMode?: string;
  previewMode?: string;
  editColumn?: string;
  addColumn?: string;
  deleteColumn?: string;
  addRow?: string;
  deleteRow?: string;
  editNode?: string;
  addNode?: string;
  deleteNode?: string;
  adjustNodeSize?: string;
  moveNode?: string;
  newNode?: string;
  enterNodeName?: string;
  enterColumnName?: string;
  confirm?: string;
  cancel?: string;
  hint_drawLine?: string;
  hint_hoverLine?: string;
  hint_hoverAnchor?: string;
  hint_moveNode?: string;
  hint_resizeNode?: string;
};

// table-flow-graph options
export interface TFGraphOptions {
  nodes?: TFGraphNode[];
  columns?: TFGraphColumn[];
  totalColumns?: number;
  maxColumns?: number;
  tableLayoutFixed?: boolean;
  // rows?: TFGraphRow[];
  totalRows?: number;
  maxRows?: number;
  isEditor?: boolean;
  lines?: string[][]; // 2D array of anchor point ids to draw lines
  labels?: Labels;
  onChangeLines?: (lines: string[][]) => void; // lines changed
  // column methods
  addColumn?: () => void; // custom add column method
  onAddColumn?: (columnData?: TFGraphColumn) => void; // add column event
  editColumn?: (column: TFGraphColumn) => void;
  onEditColumn?: (column: TFGraphColumn) => void; // on edit column callback
  deleteColumn?: (column?: TFGraphColumn) => void; // custom delete column method
  onDeleteColumn?: (column?: TFGraphColumn) => void; // delete column callback
  // row methods
  addRow?: () => void; // custom add row method
  onAddRow?: () => void; // add row
  deleteRow?: () => void; // custom delete row method
  onDeleteRow?: () => void; // delete the last row
  // node methods
  addNode?: (row: number, column: number) => void; // custom add node method
  onAddNode?: (node: TFGraphNode) => void; // add node callback
  editNode?: (node: TFGraphNode) => void; // custom edit node method
  onEditNode?: (node: TFGraphNode) => void; // edit node callback
  deleteNode?: (node: TFGraphNode) => void; // custom delete node method
  onDeleteNode?: (node: TFGraphNode) => void;
  onClickNode?: (node: TFGraphNode, nodeEl: HTMLElement) => void; // click event on viewer mode
  // onChangeNode?: (newNode: TFGraphNode, oldNode: TFGraphNode) => void;
  renderNode?: (node: TFGraphNode) => HTMLElement; // custom render node content
  renderNodeHoverPopup?: (node: TFGraphNode) => HTMLElement; // custom render node hover popup
}

// anchor point's relative position to a table cell
export type Bearing =
  | 'topleft'
  | 'top'
  | 'topright'
  | 'left'
  | 'center'
  | 'right'
  | 'bottomleft'
  | 'bottom'
  | 'bottomright';

export type Position = {
  x: number;
  y: number;
};

export interface ColumnSpec {
  left: number;
  width: number;
  columnIndex: number;
}

export interface RowSpec {
  top: number;
  height: number;
  rowIndex: number;
}

export type TableGridRect = ColumnSpec & RowSpec;

export interface LineOptions {
  positionA: Position; // x and y position relative to table element
  positionB: Position;
  thickness: number;
  isStart: boolean;
  isEnd: boolean;
}

export interface LineGroupOptions {
  anchorIds: string[];
  isDrawingActive: boolean; // current line group is drawing
}

export type BtnType = 'default' | 'primary' | 'warning' | 'danger' | 'success' | 'clean';

export interface BtnOptions {
  label?: string;
  type?: BtnType;
  className?: string;
  icon?: string;
  onClick?: (e: MouseEvent) => void;
  tooltip?: string;
}

export type TogglerItem = {
  label: string;
  id?: string;
};

export interface TogglerOptions {
  items: TogglerItem[];
  initialActiveIndex?: number;
  onChange?: (item: TogglerItem, index: number) => void;
}

export type TogglerButton = {
  itemData: TogglerItem;
  el: HTMLElement;
  index: number;
};

export interface PopupOptions {
  placement?: 'top' | 'right' | 'bottom' | 'left';
  contentElement?: HTMLElement;
}

export interface TooltipOptoins {
  placement?: 'top' | 'right' | 'bottom' | 'left';
  label?: string;
}

export interface DialogOptions {
  title: string;
  targetElement?: HTMLElement;
  contentElement: HTMLElement;
}

export interface HeaderCellMenuOptions {
  showAdd?: boolean;
  showDelete?: boolean;
}

export type PositionAndSize = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type CellPositionAndSize = {
  row: number;
  column: number;
  rowSpan: number;
  colSpan: number;
};

export type HintType =
  | 'idel'
  | 'drawLine'
  | 'hoverLine'
  | 'hoverAnchor'
  | 'moveNode'
  | 'resizeNode';
