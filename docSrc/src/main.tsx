// import * as React from 'react';
import { createRoot } from 'react-dom/client';
import 'src/styles/index.scss';
import 'virtual:windi.css';
// import 'table-flow-graph/dist/index.css';
import App from './App';

export const domReady = (callBack: () => void) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callBack);
  } else {
    callBack();
  }
};

export const windowReady = (callBack: () => void) => {
  if (document.readyState === 'complete') {
    callBack();
  } else {
    window.addEventListener('load', callBack);
  }
};

windowReady(() => createRoot(document.getElementById('root')!).render(<App />));
