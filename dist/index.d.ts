import './styles/index.scss';
import Toolbar from './components/toolbar/Toolbar';
import TableController from './components/table/TableController';
import LineController from './components/line/LineController';
import AnchorController from './components/anchor/AnchorController';
export declare class TableFlowGraph {
    element: HTMLElement;
    baseElement: HTMLElement;
    options: TFGraphOptions;
    id: string;
    toolbar: Toolbar;
    isAlive: boolean;
    hasTableHeader: boolean;
    mode: Mode;
    mousePosition: Position;
    tableController: TableController;
    lineController: LineController;
    anchorController: AnchorController;
    constructor(el: HTMLElement, options: TFGraphOptions);
    init(options: TFGraphOptions): void;
    render(): void;
    handleResize: () => void;
    debouncedHandleResize: () => void;
    handleEvent(event: any): void;
    onMourseMove(event: any): void;
    onKeydown: (e: any) => void;
    refresh(options?: TFGraphOptions): void;
    destroy(): void;
    changeMode(mode: Mode): void;
}
export type ColumnWidth = 'auto' | 'lg' | 'md' | 'sm' | 'xs';
export interface TFGraphColumn {
    id?: string;
    title?: string;
    width?: ColumnWidth | string;
}
export interface TFGraphRow {
    id?: string;
    title: string;
}
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export type ColorValue = RGB | RGBA | HEX;
export type Color = 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'purple' | 'gray' | 'black' | 'white';
export type FunctionalColor = 'primary' | 'success' | 'info' | 'warning' | 'danger';
export type NodeType = 'default' | FunctionalColor;
export type NodeStyleType = {
    [K in NodeType]: {
        type: K;
        normalStyle?: Partial<CSSStyleDeclaration>;
        hoverStyle?: Partial<CSSStyleDeclaration>;
    };
};
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
export type Mode = 'edit' | 'preview';
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
export interface TFGraphOptions {
    nodes?: TFGraphNode[];
    columns?: TFGraphColumn[];
    totalColumns?: number;
    maxColumns?: number;
    tableLayoutFixed?: boolean;
    totalRows?: number;
    maxRows?: number;
    isEditor?: boolean;
    lines?: string[][];
    labels?: Labels;
    onChangeLines?: (lines: string[][]) => void;
    addColumn?: () => void;
    onAddColumn?: (columnData?: TFGraphColumn) => void;
    editColumn?: (column: TFGraphColumn) => void;
    onEditColumn?: (column: TFGraphColumn) => void;
    deleteColumn?: (column?: TFGraphColumn) => void;
    onDeleteColumn?: (column?: TFGraphColumn) => void;
    addRow?: () => void;
    onAddRow?: () => void;
    deleteRow?: () => void;
    onDeleteRow?: () => void;
    addNode?: (row: number, column: number) => void;
    onAddNode?: (node: TFGraphNode) => void;
    editNode?: (node: TFGraphNode) => void;
    onEditNode?: (node: TFGraphNode) => void;
    deleteNode?: (node: TFGraphNode) => void;
    onDeleteNode?: (node: TFGraphNode) => void;
    onClickNode?: (node: TFGraphNode, nodeEl: HTMLElement) => void;
    renderNode?: (node: TFGraphNode) => HTMLElement;
    renderNodeHoverPopup?: (node: TFGraphNode) => HTMLElement;
}
export type Bearing = 'topleft' | 'top' | 'topright' | 'left' | 'center' | 'right' | 'bottomleft' | 'bottom' | 'bottomright';
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
export type HintType = 'idel' | 'drawLine' | 'hoverLine' | 'hoverAnchor' | 'moveNode' | 'resizeNode';
export {};
