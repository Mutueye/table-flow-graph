export declare type ColumnWidth = 'auto' | 'lg' | 'md' | 'sm' | 'xs';
export declare type TFGraphColumn = {
    id?: string;
    title: string;
    width?: ColumnWidth | string;
};
export declare type TFGraphRow = {
    id?: string;
    title: string;
};
export declare type TFGraphNode = {
    id?: string;
    title: string;
    row: number;
    column: number;
    colSpan: number;
    rowSpan: number;
    type?: 'default' | 'success' | 'warning' | 'danger' | 'primary';
    isBtn?: boolean;
};
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
export declare type TFGraphOptions = {
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
};
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
export declare type LineOptions = {
    positionA: Position;
    positionB: Position;
    thickness: number;
    isStart: boolean;
    isEnd: boolean;
};
export declare type LineGroupOptions = {
    anchorIds: string[];
    isDrawingActive: boolean;
};
export declare type BtnType = 'default' | 'primary' | 'warning' | 'danger' | 'success' | 'clean';
export declare type BtnOptions = {
    label?: string;
    type?: BtnType;
    className?: string;
    icon?: string;
    onClick?: (e: MouseEvent) => void;
    tooltip?: string;
};
export declare type TogglerItem = {
    label: string;
    id?: string;
};
export declare type TogglerOptions = {
    items: TogglerItem[];
    initialActiveIndex?: number;
    onChange?: (item: TogglerItem, index: number) => void;
};
export declare type TogglerButton = {
    itemData: TogglerItem;
    el: HTMLElement;
    index: number;
};
export declare type PopupOptions = {
    placement?: 'top' | 'right' | 'bottom' | 'left';
    contentElement?: HTMLElement;
};
export declare type TooltipOptoins = {
    placement?: 'top' | 'right' | 'bottom' | 'left';
    label?: string;
};
export declare type HeaderCellMenuOptions = {
    showAdd?: boolean;
    showDelete?: boolean;
};
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