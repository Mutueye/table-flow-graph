import { FunctionalColor, ColorValue, Color } from '..';
export declare function debounce<F extends Function>(func: F, wait: number): F;
export declare const setColumnAndRowDeletable: (occupiedList: number[][], totalRows: number, totalColumns: number) => {
    canDeleteRow: boolean;
    canDeleteColumn: boolean;
};
export declare const uniqId: () => string;
export declare const ColorPlate: Record<Color, ColorValue>;
export declare const FunctionalColors: Record<FunctionalColor, ColorValue>;
