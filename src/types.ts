// 表格列结构
export interface TFGraphColumn {
  id?: string;
  title: string;
  width: string;
}

// 表格行结构
export interface TFGraphRow {
  id?: string;
  title: string;
}

// 节点数据结构
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

// 构建表格传入的选项
export interface TFGraphOptions {
  nodes: TFGraphNode[];
  columns?: TFGraphColumn[];
  totalRows?: number;
  mode: 'edit' | 'view';
  // TODO lines
}
