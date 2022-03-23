export function div(className: string): HTMLDivElement {
  const div: HTMLDivElement = document.createElement('div');
  div.className = className;
  return div;
}

const elMatches =
  typeof Element !== 'undefined' &&
  (Element.prototype.matches || Element.prototype.webkitMatchesSelector);

export function matches(element: HTMLElement, query: string): boolean {
  if (!elMatches) {
    throw new Error('No element matching method supported');
  }

  return elMatches.call(element, query);
}

export function remove(element: HTMLElement) {
  if (element.remove) {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
}

export function queryChildren(element: HTMLElement, selector: string): HTMLElement[] {
  return Array.prototype.filter.call(element.children, (child: HTMLElement) =>
    matches(child, selector),
  );
}
