
# Table-Flow-Graph

A simple flow graph editor/viewer. (working in progress)


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

#### Step1: add js & css files
option A: Copy table-flow-graph/dist/index.css and table-flow-graph/dist/index.min.js to your project's static, and include them directly into html file:
```html
<link rel="stylesheet" href="./static/table-fow-graph/index.css">
<script src="./static/table-flow-graph/index.min.js"></script>
```
option B: For libraries like react and vue, first import the css file into your project's entry file(usally the main.js file):
```javascript
// add css to mian.js/ts/jsx/tsx
import 'table-flow-graph/dist/index.css';
```
then import TableFlowGraph wherever needed:
```javascript
import { TableFlowGraph } from 'table-flow-graph';
```

#### Step2: prepare the dom element:
```html
<div id="my_flow_graph"></div>
```

#### Step3: initiate TableFlowGraph instance:
```javascript
const el = document.getElementById('my_flow_graph');
// create a table-flow-graph with 10x10 cells
const graphInstance = new TableFlowGraph(el, {
    isEditor: true,
    totalColumns: 10,
    totalRows: 10,
});
```



## Options

| Option | Type | Description | default
| --- | --- | --- | --- |
| `isEditor` | Boolean | Is this flow graph instance an editor or viewer | false
| `nodes` | Array | nodes(blocks) of the flow graph | []
| `columns` | Array | stores data of table header title and column width | []
| `lines` | Array | 2D array of anchor point ids to draw lines | []
| `totalRows` | positive integer | Total row number of flow graph table | 8
| `totalColumns` | positive integer | Total column numbe fo flow graph table | 8
| `maxRows` | positive integer | Disable add row functionalitiy when totalRows reaches maxRows | 30
| `maxColumns` | positive integer | Disable add column functionalitiy when totalColumns reaches maxColumns | 12
| `tableLayoutFixed` | Boolean |  If `true`, the width of each column will be equal | false
| `labels` | Object | No i18n functionalitiy provided in this project, you can use this option to customize all the used texts | -
| ...

