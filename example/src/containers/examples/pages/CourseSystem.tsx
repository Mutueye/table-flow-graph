import React, { useEffect, useState, useCallback } from 'react';

import { TableFlowGraph, TFGraphNode, TFGraphOptions, TFGraphColumn } from 'table-flow-graph';
import { createReactInstance } from 'src/createReactInstance';
import NodeTitle from 'src/containers/home/components/NodeTitle';
import { loadGraphData, saveGraphData } from 'src/utils/storageManager';
import { defaultCourseSystemData } from '../datas';

type Props = {
  className?: string;
};

const CourseSystem: React.FC<Props> = ({ className }) => {
  const [graphInstance, setGraphInstance] = useState<TableFlowGraph | null>(null);
  const customClassName = className ? className : '';

  const onChangeLines = (lines: string[][]) => {
    const data = loadGraphData('course_system', defaultCourseSystemData);
    data.lines = lines;
    saveGraphData('course_system', data);
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
      const data = loadGraphData('course_system', defaultCourseSystemData);
      data.nodes.push(nodeData);
      saveGraphData('course_system', data);
      // console.log('graphInstance:::::', graphInstance);
      // console.log('nodes::::', graphInstance.options.nodes);
    },
    [graphInstance],
  );

  const onEditNode = useCallback(
    (nodeData: TFGraphNode) => {
      console.log('onEditNode:::', nodeData);
      const data = loadGraphData('course_system', defaultCourseSystemData);
      const index = data.nodes.findIndex((item) => item.id === nodeData.id);
      if (index > -1) {
        data.nodes[index] = nodeData;
        saveGraphData('course_system', data);
      }
    },
    [graphInstance],
  );

  const onDeleteNode = (node: TFGraphNode) => {
    console.log('node:::', node);
    const data = loadGraphData('course_system', defaultCourseSystemData);
    const nodeList = data.nodes.filter((item) => item.id !== node.id);
    data.nodes = nodeList;
    saveGraphData('course_system', data);
  };

  const onAddColumn = (column: TFGraphColumn) => {
    const data = loadGraphData('course_system', defaultCourseSystemData);
    data.columns.push(column);
    saveGraphData('course_system', data);
  };

  const onEditColumn = (column: TFGraphColumn) => {
    const data = loadGraphData('course_system', defaultCourseSystemData);
    const index = data.columns.findIndex((item) => item.id === column.id);
    if (index > -1) {
      data.columns[index] = column;
      saveGraphData('course_system', data);
    }
  };

  const onDeleteColumn = (column: TFGraphColumn) => {
    const data = loadGraphData('course_system', defaultCourseSystemData);
    const list = data.columns.filter((item) => item.id !== column.id);
    data.columns = list;
    saveGraphData('course_system', data);
  };

  const renderNodeHoverPopup = (node: TFGraphNode) => {
    const el = document.createElement('div');
    createReactInstance(<NodeTitle title={node.title} info={node.meta?.info as string} />, el);
    return el;
  };

  const savedGraphData = loadGraphData('course_system', defaultCourseSystemData);

  const options: TFGraphOptions = {
    isEditor: true,
    totalColumns: 8,
    tableLayoutFixed: true,
    labels: {
      editMode: '编辑模式',
      previewMode: '查看模式',
      editColumn: '编辑当前学期',
      addColumn: '添加学期',
      deleteColumn: '删除当前学期',
      addRow: '添加行',
      deleteRow: '删除当前行',
      editNode: '编辑课程',
      addNode: '添加课程',
      deleteNode: '删除课程',
      adjustNodeSize: '调整课程大小',
      moveNode: '移动课程',
      newNode: '新增课程',
      enterNodeName: '输入课程名称',
      enterColumnName: '输入学期名称',
      confirm: '确定',
      cancel: '取消',
      hint_drawLine:
        '点击另一个锚点进行连线；按下[ESC]取消上一个线段；按下回车或双击鼠标左键结束画线',
      hint_hoverLine: '双击鼠标左键删除连线',
      hint_hoverAnchor: '点击锚点开始画线',
      hint_moveNode: '移动光标即可移动该课程，点击鼠标左键完成移动',
      hint_resizeNode: '移动光标调整大小，点击鼠标左键完成调整',
    },
    nodes: savedGraphData.nodes,
    columns: savedGraphData.columns,
    lines: savedGraphData.lines,
    totalRows: 8,
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
    const el = document.getElementById('course_system');
    const instance = new TableFlowGraph(el!, options);
    setGraphInstance(instance);
  }, []);

  return (
    <div className={`w-full bg-white relative my-20px ${customClassName}`} id="course_system" />
  );
};

export default CourseSystem;
