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

// node data
export interface TFGraphNode {
  id: string | number;
  title: string;
  row: number;
  column: number;
  colSpan: number;
  rowSpan: number;
  type?: 'default' | 'success' | 'warning' | 'danger' | 'primary';
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
  rows?: TFGraphRow[];
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
  deleteColumn?: () => void; // custom delete column method
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
