export interface TFGraphColumn {
  title: string;
  width: string;
}

export interface TFGraphRow {
  title: string;
}

export interface TFGraphNode {
  title: string;
  colSpan: number;
  rowSpan: number;
  type: 'default' | 'success' | 'warning' | 'danger' | 'primary';
}
