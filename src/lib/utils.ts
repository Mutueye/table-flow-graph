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
