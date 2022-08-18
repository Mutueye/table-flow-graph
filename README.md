
# Table-Flow-Graph

A simple flow graph editor/viewer.


## Features

- Light-weight flow graph based on html table
- Grid based lines
- Movable & resizable nodes
- Fully customizable


## Installation

Via npm
```bash
  npm install table-flow-graph
```
Via yarn
```bash
  yarn add table-flow-graph
```

    
## Usage

#### Step1: add necessary files
option A: Copy table-flow-graph/dist/index.css file to your project's static or public folder, and include it directly in html file:
```html
<link rel="stylesheet" href="./static/table-fow-graph/index.css">
<script src="./static/table-flow-graph/index.min.js"></script>
```
option B: For ui libraries like react and vue, first import the css file into your project's entry file(usally the main.js file):
```javascript
// impor css in mian.js/ts/jsx/tsx
import 'table-flow-graph/dist/index.css';
```
then import TableFlowGraph wherever needed:
```javascript
import { TableFlowGraph } from 'table-flow-graph';
```

#### Step2: prepare the dom element where table-flow-graph is rendered:
```html
<div id="my_flow_graph"></div>
```

#### Step3: initiate the TableFlowGraph instance:
```javascript
const el = document.getElementById('my_flow_graph');
// create a table-flow-graph weith 10x10 cells
const graphInstance = new TableFlowGraph(el, {
    isEditor: true,
    totalColumns: 10,
    totalRows: 10,
});
```



## Options

TODO

