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
