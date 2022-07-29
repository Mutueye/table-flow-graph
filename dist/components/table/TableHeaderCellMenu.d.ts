import { TableFlowGraph } from '../../index';
import { HeaderCellMenuOptions } from '../../types';
import TableHeaderCell from './TableHeaderCell';
/**
 * table-flow-graph tabel header cell menu
 * !!Deprecated
 */
export default class TableHeaderCellMenu {
    graphInstance: TableFlowGraph;
    options: HeaderCellMenuOptions;
    element: HTMLElement;
    headerCell: TableHeaderCell;
    constructor(headerCell: TableHeaderCell, options: HeaderCellMenuOptions);
    createBtns(parentElement: HTMLElement): void;
}
