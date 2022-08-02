export declare type ColumnWidth = 'auto' | 'lg' | 'md' | 'sm' | 'xs';
export interface TFGraphColumn {
    id?: string;
    title: string;
    width?: ColumnWidth | string;
}
export interface TFGraphRow {
    id?: string;
    title: string;
}
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
export declare type Mode = 'edit' | 'preview';
export declare type Labels = {
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
};
export interface TFGraphOptions {
    nodes?: TFGraphNode[];
    columns?: TFGraphColumn[];
    totalColumns?: number;
    maxColumns?: number;
    rows?: TFGraphRow[];
    totalRows?: number;
    maxRows?: number;
    isEditor?: boolean;
    lines?: string[][];
    labels?: Labels;
    renderNode?: (node: TFGraphNode, parentElement: HTMLElement) => HTMLElement;
    onChangeLines?: (lines: string[][]) => void;
    onAddColumn?: () => void;
    onEditColumn?: (column: TFGraphColumn) => void;
    onDeleteColumn?: (column: TFGraphColumn) => void;
    onAddRow?: () => void;
    onDeleteRow?: () => void;
    onAddNode?: (row: number, column: number) => void;
    onEditNode?: (nodeData: TFGraphNode) => void;
    onDeleteNode?: (nodeData: TFGraphNode) => void;
    onChangeNode?: (newNode: TFGraphNode, oldNode: TFGraphNode) => void;
}
export declare type Bearing = 'topleft' | 'top' | 'topright' | 'left' | 'center' | 'right' | 'bottomleft' | 'bottom' | 'bottomright';
export declare type Position = {
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
export declare type TableGridRect = ColumnSpec & RowSpec;
export interface LineOptions {
    positionA: Position;
    positionB: Position;
    thickness: number;
    isStart: boolean;
    isEnd: boolean;
}
export interface LineGroupOptions {
    anchorIds: string[];
    isDrawingActive: boolean;
}
export declare type BtnType = 'default' | 'primary' | 'warning' | 'danger' | 'success' | 'clean';
export interface BtnOptions {
    label?: string;
    type?: BtnType;
    className?: string;
    icon?: string;
    onClick?: (e: MouseEvent) => void;
    tooltip?: string;
}
export declare type TogglerItem = {
    label: string;
    id?: string;
};
export interface TogglerOptions {
    items: TogglerItem[];
    initialActiveIndex?: number;
    onChange?: (item: TogglerItem, index: number) => void;
}
export declare type TogglerButton = {
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
export interface HeaderCellMenuOptions {
    showAdd?: boolean;
    showDelete?: boolean;
}
export declare type PositionAndSize = {
    left: number;
    top: number;
    width: number;
    height: number;
};
export declare type CellPositionAndSize = {
    row: number;
    column: number;
    rowSpan: number;
    colSpan: number;
};
