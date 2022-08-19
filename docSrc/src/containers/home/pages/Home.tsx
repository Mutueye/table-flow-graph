import React, { useEffect, useState } from 'react';

import { TableFlowGraph, TFGraphNode, TFGraphOptions } from '../../../../../dist/index.es.js';
import NodeTitle from '../components/NodeTitle';
import { createReactInstance } from '../../createReactInstance';

type Props = {
  className?: string;
};

const Home: React.FC<Props> = ({ className }) => {
  const [graphInstance, setGraphInstance] = useState<TableFlowGraph | null>(null);

  const onChangeLines = (lines: string[][]) => {
    console.log('lines:::::::', lines);
  };

  const renderNode = (node: TFGraphNode) => {
    const el = document.createElement('div');
    switch (node.id) {
      case '1':
        createReactInstance(<NodeTitle title={node.title} info={node.meta.info as string} />, el);
        break;
      default:
        el.className = 'flex flex-row items-center justify-center text-size-16px';
        el.innerText = node.title;
        break;
    }
    return el;
  };

  const onAddNode = () => {
    console.log('nodes::::', graphInstance.options.nodes);
  };

  const renderNodeHoverPopup = (node: TFGraphNode) => {
    const el = document.createElement('div');
    createReactInstance(<NodeTitle title={node.title} info={node.meta?.info as string} />, el);
    return el;
  };

  const options: TFGraphOptions = {
    isEditor: true,
    totalColumns: 10,
    tableLayoutFixed: true,
    // columns: [
    //   {
    //     id: '1',
    //     title: 'col1',
    //   },
    //   {
    //     id: '2',
    //     title: 'col2',
    //   },
    //   {
    //     id: '3',
    //     title: 'col3',
    //   },
    //   {
    //     id: '4',
    //     title: 'col4',
    //   },
    //   {
    //     id: '5',
    //     title: 'col5',
    //   },
    //   {
    //     id: '6',
    //     title: 'col6',
    //   },
    //   {
    //     id: '7',
    //     title: 'col7',
    //   },
    //   {
    //     id: '8',
    //     title: 'col8',
    //   },
    //   {
    //     id: '9',
    //     title: 'col9',
    //   },
    //   {
    //     id: '10',
    //     title: 'col10',
    //   },
    // ],
    totalRows: 15,
    lines: [
      ['a_2_4_b_nx_oy', 'a_4_4_c_nx_ny', 'a_4_3_r_ox_ny'],
      ['a_2_5_b_nx_oy', 'a_4_5_c_nx_ny', 'a_4_6_l_ox_ny'],
      ['a_2_4_br_nx_oy', 'a_10_4_tr_nx_oy'],
      ['a_10_4_l_ox_ny', 'a_10_3_c_nx_ny', 'a_8_3_c_nx_ny', 'a_8_2_r_ox_ny'],
      ['a_10_4_l_ox_ny', 'a_10_3_c_nx_ny', 'a_12_3_c_nx_ny', 'a_12_2_r_ox_ny'],
      ['a_10_5_r_ox_ny', 'a_10_6_c_nx_ny', 'a_8_6_c_nx_ny', 'a_8_7_l_ox_ny'],
      ['a_10_5_r_ox_ny', 'a_10_6_c_nx_ny', 'a_12_6_c_nx_ny', 'a_12_7_l_ox_ny'],
    ],
    nodes: [
      {
        id: '1',
        row: 1,
        rowSpan: 2,
        column: 1,
        colSpan: 8,
        title: 'Table Flow Graph',
        meta: {
          info: 'A simple flow graph editor/viewer build with html & css',
        },
      },
      {
        id: '2',
        type: 'primary',
        isBtn: true,
        row: 4,
        rowSpan: 1,
        column: 1,
        colSpan: 3,
        title: 'Get Started',
        showPopup: true,
      },
      {
        id: '3',
        type: 'primary',
        isBtn: true,
        row: 4,
        rowSpan: 1,
        column: 6,
        colSpan: 3,
        title: 'Examples',
      },
      {
        id: '4',
        type: 'default',
        row: 10,
        rowSpan: 1,
        column: 4,
        colSpan: 2,
        title: 'Features',
      },
      {
        id: '5',
        type: 'default',
        row: 7,
        rowSpan: 3,
        column: 1,
        colSpan: 2,
        title: 'Grid-based Lines',
      },
      {
        id: '6',
        type: 'default',
        row: 11,
        rowSpan: 3,
        column: 1,
        colSpan: 2,
        title: 'Fully Customizable',
      },
      {
        id: '7',
        type: 'default',
        row: 7,
        rowSpan: 3,
        column: 7,
        colSpan: 2,
        title: 'Moveable & Resizable',
      },
      {
        id: '8',
        row: 11,
        column: 7,
        rowSpan: 3,
        colSpan: 2,
        title: 'Build-in @types',
      },
    ],
    onChangeLines,
    onClickNode(node, nodeEl) {
      console.log('clickNode::::', node, nodeEl);
    },
    renderNode,
    onAddNode,
    renderNodeHoverPopup,
  };

  useEffect(() => {
    const el = document.getElementById('home_graph');
    const instance = new TableFlowGraph(el!, options);
    setGraphInstance(instance);
  }, []);
  return <div className={'w-full bg-white relative my-20px ' + className} id="home_graph"></div>;
};

export default Home;
