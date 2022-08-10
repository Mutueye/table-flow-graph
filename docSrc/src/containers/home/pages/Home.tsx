import React, { useEffect, useState } from 'react';

import { TableFlowGraph } from '../../../../../src';
import { TFGraphNode, TFGraphOptions } from '../../../../../src/types';
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

  const renderNodeHoverPopup = (node: TFGraphNode) => {
    const el = document.createElement('div');
    createReactInstance(<NodeTitle title={node.title} info={node.meta?.info as string} />, el);
    return el;
  };

  const options: TFGraphOptions = {
    isEditor: true,
    totalColumns: 10,
    totalRows: 12,
    lines: [
      [
        'anchor_2_3_bottom_normalx_offsety',
        'anchor_3_3_center_normalx_normaly',
        'anchor_3_2_center_normalx_normaly',
        'anchor_4_2_top_normalx_offsety',
      ],
      [
        'anchor_2_6_bottom_normalx_offsety',
        'anchor_3_6_center_normalx_normaly',
        'anchor_3_7_center_normalx_normaly',
        'anchor_4_7_top_normalx_offsety',
      ],
      ['anchor_2_4_bottomright_normalx_offsety', 'anchor_6_4_topright_normalx_offsety'],
      ['anchor_6_4_bottomright_normalx_offsety', 'anchor_8_4_topright_normalx_offsety'],
      [
        'anchor_6_4_left_offsetx_normaly',
        'anchor_6_3_center_normalx_normaly',
        'anchor_7_1_right_normalx_normaly',
        'anchor_8_1_topright_normalx_offsety',
      ],
      [
        'anchor_6_5_right_offsetx_normaly',
        'anchor_6_6_center_normalx_normaly',
        'anchor_7_7_right_normalx_normaly',
        'anchor_8_7_topright_normalx_offsety',
      ],
    ],
    nodes: [
      {
        id: '1',
        row: 1,
        rowSpan: 2,
        column: 2,
        colSpan: 6,
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
        showPopup: true,
      },
      {
        id: '4',
        type: 'default',
        row: 6,
        rowSpan: 1,
        column: 4,
        colSpan: 2,
        title: 'Features',
      },
      {
        id: '5',
        type: 'default',
        row: 8,
        rowSpan: 3,
        column: 1,
        colSpan: 2,
        title: 'Feature1',
      },
      {
        id: '6',
        type: 'default',
        row: 8,
        rowSpan: 3,
        column: 4,
        colSpan: 2,
        title: 'Feature2',
      },
      {
        id: '7',
        type: 'default',
        row: 8,
        rowSpan: 3,
        column: 7,
        colSpan: 2,
        title: 'Feature3',
      },
    ],
    onChangeLines,
    onClickNode(node, nodeEl) {
      console.log('clickNode::::', node, nodeEl);
    },
    renderNode,
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
