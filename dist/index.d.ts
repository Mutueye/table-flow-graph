import './styles/index.scss';
import { Mode, Position, TFGraphOptions } from './types';
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
    mode: Mode;
    mousePosition: Position;
    tableController: TableController;
    lineController: LineController;
    anchorController: AnchorController;
    constructor(el: HTMLElement, options: TFGraphOptions);
    init(options: TFGraphOptions): void;
    render(): void;
    handleEvent(event: any): void;
    onMourseMove(event: any): void;
    onResize(): void;
    onKeydown: (e: any) => void;
    refresh(options?: TFGraphOptions): void;
    destroy(): void;
    changeMode(mode: Mode): void;
}
