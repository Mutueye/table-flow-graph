// table column header data
export type TFGraphColumn = {
  id?: string;
  title: string;
  width: string;
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

// table-flow-graph options
export type TFGraphOptions = {
  nodes: TFGraphNode[];
  columns?: TFGraphColumn[];
  totalColumns?: number;
  rows?: TFGraphRow[];
  totalRows?: number;
  isEditor: boolean;
  // TODO lines
};

// anchor point's relative position of a table cell
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

export type BtnType = 'default' | 'primary' | 'warning' | 'danger' | 'success' | 'clean';

export type BtnOptions = {
  label?: string;
  type?: BtnType;
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
