export declare function debounce<F extends Function>(func: F, wait: number): F;
export declare const setColumnAndRowDeletable: (occupiedList: number[][], totalRows: number, totalColumns: number) => {
    canDeleteRow: boolean;
    canDeleteColumn: boolean;
};
export declare const uniqId: () => string;
