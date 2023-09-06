import React, { useEffect, useState, useCallback } from 'react';

import { TableFlowGraph, TFGraphNode, TFGraphOptions, TFGraphColumn } from 'table-flow-graph';
import { createReactInstance } from 'src/createReactInstance';
import NodeTitle from 'src/containers/home/components/NodeTitle';
import { loadGraphData, saveGraphData } from 'src/utils/storageManager';
import { defaultCourseSystemData } from '../datas';

type Props = {
  className?: string;
};

const Playground: React.FC<Props> = ({ className }) => {
  const [graphInstance, setGraphInstance] = useState<TableFlowGraph | null>(null);
  const customClassName = className ? className : '';

  const onChangeLines = (lines: string[][]) => {
    const data = loadGraphData('playground', defaultCourseSystemData);
    data.lines = lines;
    saveGraphData('playground', data);
  };

  const renderNode = useCallback(
    (node: TFGraphNode) => {
      const el = document.createElement('div');
      const className = 'flex flex-row items-center justify-center text-size-13px leading-18px';
      el.className = className;
      if (graphInstance && graphInstance.mode === 'preview' && node.showPopup) {
        el.className = `${className} cursor-pointer`;
      }
      el.innerText = node.title;
      return el;
    },
    [graphInstance],
  );

  const onAddNode = useCallback(
    (nodeData: TFGraphNode) => {
      console.log('onAddNode:::::', nodeData);
      const data = loadGraphData('playground');
      data.nodes.push(nodeData);
      saveGraphData('playground', data);
      // console.log('graphInstance:::::', graphInstance);
      // console.log('nodes::::', graphInstance.options.nodes);
    },
    [graphInstance],
  );

  const onEditNode = useCallback(
    (nodeData: TFGraphNode) => {
      console.log('onEditNode:::', nodeData);
      const data = loadGraphData('playground');
      const index = data.nodes.findIndex((item) => item.id === nodeData.id);
      if (index > -1) {
        data.nodes[index] = nodeData;
        saveGraphData('playground', data);
      }
    },
    [graphInstance],
  );

  const onDeleteNode = (node: TFGraphNode) => {
    console.log('node:::', node);
    const data = loadGraphData('playground');
    const nodeList = data.nodes.filter((item) => item.id !== node.id);
    data.nodes = nodeList;
    saveGraphData('playground', data);
  };

  const onAddColumn = (column: TFGraphColumn) => {
    const data = loadGraphData('playground');
    data.columns.push(column);
    saveGraphData('playground', data);
  };

  const onEditColumn = (column: TFGraphColumn) => {
    const data = loadGraphData('playground');
    const index = data.columns.findIndex((item) => item.id === column.id);
    if (index > -1) {
      data.columns[index] = column;
      saveGraphData('playground', data);
    }
  };

  const onDeleteColumn = (column: TFGraphColumn) => {
    const data = loadGraphData('playground');
    const list = data.columns.filter((item) => item.id !== column.id);
    data.columns = list;
    saveGraphData('playground', data);
  };

  const renderNodeHoverPopup = (node: TFGraphNode) => {
    const el = document.createElement('div');
    createReactInstance(<NodeTitle title={node.title} info={node.meta?.info as string} />, el);
    return el;
  };

  const savedGraphData = loadGraphData('playground');

  const options: TFGraphOptions = {
    isEditor: true,
    totalColumns: 8,
    tableLayoutFixed: true,
    labels: {
      editMode: '编辑模式',
      previewMode: '查看模式',
      editColumn: '编辑当前列',
      addColumn: '添加列',
      deleteColumn: '删除当前列',
      addRow: '添加行',
      deleteRow: '删除当前行',
      editNode: '编辑节点',
      addNode: '添加节点',
      deleteNode: '删除节点',
      adjustNodeSize: '调整节点大小',
      moveNode: '移动节点',
      newNode: '新增节点',
      enterNodeName: '输入节点名称',
      enterColumnName: '输入列名称',
      confirm: '确定',
      cancel: '取消',
      hint_drawLine:
        '点击另一个锚点进行连线；按下[ESC]取消上一个线段；按下回车或双击鼠标左键结束画线',
      hint_hoverLine: '双击鼠标左键删除连线',
      hint_hoverAnchor: '点击锚点开始画线',
      hint_moveNode: '移动光标即可移动该节点，点击鼠标左键完成移动',
      hint_resizeNode: '移动光标调整大小，点击鼠标左键完成调整',
    },
    nodes: savedGraphData.nodes,
    columns: savedGraphData.columns,
    lines: savedGraphData.lines,
    totalRows: 12,
    maxRows: 20,
    // onClickNode: (node, nodeEl) => { console.log('clickNode::::', node, nodeEl); },
    renderNode,
    renderNodeHoverPopup,
    onChangeLines,
    onAddNode,
    onEditNode,
    onDeleteNode,
    onAddColumn,
    onEditColumn,
    onDeleteColumn,
  };

  useEffect(() => {
    const el = document.getElementById('playground');
    const instance = new TableFlowGraph(el!, options);
    setGraphInstance(instance);
  }, []);

  return <div className={`w-full bg-white relative my-20px ${customClassName}`} id="playground" />;
};

export default Playground;
