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
<link rel="stylesheet" href="./static/table-fow-graph/index.css" />
<script src="./static/table-flow-graph/index.min.js"></script>
```

option B: For libraries like react and vue, first import the css file into your project's entry file(usally the main.js file):

```javascript
// add css to mian.js/ts/jsx/tsx
import 'table-flow-graph/dist/index.css'
```

then import TableFlowGraph wherever needed:

```javascript
import { TableFlowGraph } from 'table-flow-graph'
```

#### Step2: prepare the dom element:

```html
<div id="my_flow_graph"></div>
```

#### Step3: initiate TableFlowGraph instance:

```javascript
const el = document.getElementById('my_flow_graph')
// create a table-flow-graph with 10x10 cells
const graphInstance = new TableFlowGraph(el, {
  isEditor: true,
  totalColumns: 10,
  totalRows: 10
})
```

## Options

| Option                 | Type             | Description                                                                                                                                                                                                                                                                               | Default |
| ---------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `isEditor`             | Boolean          | If set to true, this flow graph instance will be editable.                                                                                                                                                                                                                                | false   |
| `nodes`                | Array            | nodes(blocks) of the flow graph.                                                                                                                                                                                                                                                          | []      |
| `columns`              | Array            | stores data of table header title and column width.                                                                                                                                                                                                                                       | []      |
| `lines`                | Array            | 2D array of anchor point ids to draw lines.                                                                                                                                                                                                                                               | []      |
| `totalRows`            | positive integer | Total row number of flow graph table.                                                                                                                                                                                                                                                     | 8       |
| `totalColumns`         | positive integer | Total column numbe fo flow graph table.                                                                                                                                                                                                                                                   | 8       |
| `maxRows`              | positive integer | Disable add row functionalitiy when totalRows reaches maxRows.                                                                                                                                                                                                                            | 30      |
| `maxColumns`           | positive integer | Disable add column functionalitiy when totalColumns reaches maxColumns.                                                                                                                                                                                                                   | 12      |
| `tableLayoutFixed`     | Boolean          | If `true`, the width of each column will be equal.                                                                                                                                                                                                                                        | false   |
| `labels`               | Object           | No i18n functionalitiy provided in this project, you can use this option to customize all the texts/labels.                                                                                                                                                                               | -       |
| `onChangeLines`        | Function         | Event hook triggered when new line is drawn or a line is deleted.                                                                                                                                                                                                                         | -       |
| `addColumn`            | Function         | Event hook triggered when 'Add Column' button is pressed. This will overwrite the build in functionalitiy of adding new column(which will trigger `onAddColumn`). You need to call `refresh(newOptions)` to refresh the flow graph instance after adding column with this method.         | -       |
| `onAddColumn`          | Function         | Event hook triggered after adding column with build in method.                                                                                                                                                                                                                            | -       |
| `editColumn`           | Function         | Event hook triggered when 'Edit Column' button is pressed. This will overwrite the build in functionalitiy of editing a column(which will trigger `onEditColumn`). You need to call `refresh(newOptions)` to refresh the flow graph instance after editing column with this method.       | -       |
| `onEditColumn`         | Function         | Event hook triggered after editing column with build in method.                                                                                                                                                                                                                           | -       |
| `deleteColumn`         | Function         | Event hook triggered when 'Delete Column' button is pressed. This will overwrite the build in functionalitiy of deleting a column(which will trigger `onDeleteColumn`). You need to call `refresh(newOptions)` to refresh the flow graph instance after deleting column with this method. | -       |
| `onDeleteColumn`       | Function         | Event hook triggered after deleting column with build in method.                                                                                                                                                                                                                          | -       |
| `addRow`               | Function         | Event hook triggered when 'Add Row' button is pressed. This will overwrite the build in functionalitiy of adding new row(which will trigger `onAddRow`). You need to call `refresh(newOptions)` to refresh the flow graph instance after adding row with this method.                     | -       |
| `onAddRow`             | Function         | Event hook triggered after adding row with build in method.                                                                                                                                                                                                                               | -       |
| `deleteRow`            | Function         | Event hook triggered when 'Delete Row' button is pressed. This will overwrite the build in functionalitiy of deleting a row(which will trigger `onDeleteRow`). You need to call `refresh(newOptions)` to refresh the flow graph instance after deleting row with this method.             | -       |
| `onDeleteRow`          | Function         | Event hook triggered after deleting row with build in method.                                                                                                                                                                                                                             | -       |
| `addNode`              | Function         | Event hook triggered when 'Add Node' button is pressed. This will overwrite the build in functionalitiy of adding a node(which will trigger `onAddNode`). You need to call `refresh(newOptions)` to refresh the flow graph instance after adding node with this method.                   | -       |
| `onAddNode`            | Function         | Event hook triggered after adding node with build in method.                                                                                                                                                                                                                              | -       |
| `editNode`             | Function         | Event hook triggered when 'Edit Node' button is pressed. This will overwrite the build in functionalitiy of editing node(which will trigger `onEditNode`). You need to call `refresh(newOptions` to refresh the flow graph instance after editing node with this method.                  | -       |
| `onEditNode`           | Function         | Event hook triggered after editing node with build in method.                                                                                                                                                                                                                             | -       |
| `deleteNode`           | Function         | Event hook triggered when 'Delete Node' button is pressed. This will overwrite the build in functionalitiy of deleting a node(which will trigger `onDeleteNode`). You need to call `refresh(newOptions)`                                                                                  | -       |
| `onDeleteNode`         | Function         | Event hook triggered after deleting node with build in method.                                                                                                                                                                                                                            | -       |
| `onClickNode`          | Function         | Event hook triggered when node is clicked in viewer mode.                                                                                                                                                                                                                                 | -       |
| `renderNode`           | Function         | Customize how the node content is rendered.                                                                                                                                                                                                                                               | -       |
| `renderNodeHoverPopup` | Function         | Customize how the node's hover Popup is rendered.                                                                                                                                                                                                                                         | -       |
