import { FunctionalColor, ColorValue, Color } from '..';

// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce<F extends Function>(func: F, wait: number): F {
  let timeoutID: number;

  if (!Number.isInteger(wait)) {
    console.warn('Call debounce without a valid number');
    wait = 300;
  }

  // conversion through any necessary as it wont satisfy criteria otherwise
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <any>function (this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    timeoutID = window.setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}

// check if last column/row deleteable by occupiedList
export const setColumnAndRowDeletable = (
  occupiedList: number[][],
  totalRows: number,
  totalColumns: number,
) => {
  let canDeleteColumn = true;
  let canDeleteRow = true;
  for (let i = 0; i < totalRows - 1; i++) {
    if (occupiedList[i][totalColumns - 1] !== 0) {
      canDeleteColumn = false;
    }
  }
  for (let i = 0; i < totalColumns - 1; i++) {
    if (occupiedList[totalRows - 1][i] !== 0) {
      canDeleteRow = false;
    }
  }
  return { canDeleteRow, canDeleteColumn };
};

export const uniqId = () => {
  const eles = window.document.getElementsByTagName('body');
  const bodyObj = eles.item(0);
  const c = bodyObj.innerHTML.length;
  const t = new Date().getTime();
  const n = Math.floor(Math.random() * 100 + 1);
  return c.toString() + t.toString() + n.toString();
};

export const ColorPlate: Record<Color, ColorValue> = {
  red: '#FA5151',
  orange: '#F96400',
  yellow: '#FCB42C',
  green: '#68DE4D',
  cyan: '#28E1F0',
  blue: '#3366FF',
  purple: '#8433FF',
  gray: '#9398A5',
  black: '#000000',
  white: '#FFFFFF',
};

export const FunctionalColors: Record<FunctionalColor, ColorValue> = {
  primary: ColorPlate.blue,
  success: ColorPlate.green,
  info: ColorPlate.gray,
  warning: ColorPlate.orange,
  danger: ColorPlate.red,
};
