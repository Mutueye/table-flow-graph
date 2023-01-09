// import * as React from 'react';
import { createRoot } from 'react-dom/client';
// import 'antd/dist/antd.less';
import '../../dist/index.css';
import 'src/styles/index.scss';
import 'virtual:windi.css';

import App from './App';

// export const domReady = (callBack: () => void) => {
//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', callBack);
//   } else {
//     callBack();
//   }
// };

const windowReady = (callBack: () => void) => {
  if (document.readyState === 'complete') {
    callBack();
  } else {
    window.addEventListener('load', callBack);
  }
};

// render app when window ready for table-flow-graph's lines to render correctly
windowReady(() => createRoot(document.getElementById('root')!).render(<App />));
