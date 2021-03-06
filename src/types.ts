export type ColumnWidth = 'auto' | 'lg' | 'md' | 'sm' | 'xs';

// table column header data
export type TFGraphColumn = {
  id?: string;
  title: string;
  width?: ColumnWidth | string;
};

// table row header data
export type TFGraphRow = {
  id?: string;
  title: string;
};

// node data
export type TFGraphNode = {
  id?: string;
  title: string;
  row: number;
  column: number;
  colSpan: number;
  rowSpan: number;
  type?: 'default' | 'success' | 'warning' | 'danger' | 'primary';
  isBtn?: boolean;
};

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
  adjustNodeSize?: string;
  moveNode?: string;
};

// table-flow-graph options
export type TFGraphOptions = {
  nodes?: TFGraphNode[];
  columns?: TFGraphColumn[];
  totalColumns?: number;
  maxColumns?: number;
  rows?: TFGraphRow[];
  totalRows?: number;
  maxRows?: number;
  isEditor?: boolean;
  lines?: string[][]; // 2D array of anchor point ids to draw lines
  labels?: Labels;
  onChangeLines?: (lines: string[][]) => void; // lines changed
  onAddColumn?: () => void; // add column
  onEditColumn?: (column: TFGraphColumn) => void; // edit column
  onDeleteColumn?: (column: TFGraphColumn) => void; // delete column
  onAddRow?: () => void; // add row
  onDeleteRow?: () => void; // delete the last row
};

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

export type LineOptions = {
  positionA: Position; // x and y position relative to table element
  positionB: Position;
  thickness: number;
  isStart: boolean;
  isEnd: boolean;
};

export type LineGroupOptions = {
  anchorIds: string[];
  isDrawingActive: boolean; // current line group is drawing
};

export type BtnType = 'default' | 'primary' | 'warning' | 'danger' | 'success' | 'clean';

export type BtnOptions = {
  label?: string;
  type?: BtnType;
  className?: string;
  icon?: string;
  onClick?: (e: MouseEvent) => void;
};

export type TogglerItem = {
  label: string;
  id?: string;
};

export type TogglerOptions = {
  items: TogglerItem[];
  initialActiveIndex?: number;
  onChange?: (item: TogglerItem, index: number) => void;
};

export type TogglerButton = {
  itemData: TogglerItem;
  el: HTMLElement;
  index: number;
};

export type PopupOptions = {
  placement?: 'top' | 'right' | 'bottom' | 'left';
  contentElement?: HTMLElement;
};

export type HeaderCellMenuOptions = {
  showAdd?: boolean;
  showDelete?: boolean;
};
