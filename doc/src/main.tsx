import React from 'react';
import { createRoot } from 'react-dom/client';
import 'src/styles/index.scss';
import 'virtual:windi.css';
import App from './App';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root'),
// );
