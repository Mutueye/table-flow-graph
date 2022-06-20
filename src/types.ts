// table column header data
export interface TFGraphColumn {
  id?: string;
  title: string;
  width: string;
}

// table row header data
export interface TFGraphRow {
  id?: string;
  title: string;
}

// node data
export interface TFGraphNode {
  id?: string;
  title: string;
  row: number;
  column: number;
  colSpan: number;
  rowSpan: number;
  type?: 'default' | 'success' | 'warning' | 'danger' | 'primary';
  isBtn?: boolean;
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

// table-flow-graph options
export interface TFGraphOptions {
  nodes: TFGraphNode[];
  columns?: TFGraphColumn[];
  totalColumns?: number;
  rows?: TFGraphRow[];
  totalRows?: number;
  mode: 'edit' | 'view';
  refreshOnResize?: Boolean;
  // TODO lines
}

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
