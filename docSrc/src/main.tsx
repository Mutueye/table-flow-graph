// import * as React from 'react';
import { createRoot } from 'react-dom/client';
import 'src/styles/index.scss';
import 'virtual:windi.css';
// import 'table-flow-graph/dist/index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(<App />);
