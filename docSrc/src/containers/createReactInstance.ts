import * as React from 'react';
import { createRoot } from 'react-dom/client';

export const createReactInstance = (component: React.ReactNode, el: Element) => {
  createRoot(el).render(component);
};
