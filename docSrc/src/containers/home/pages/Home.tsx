import React, { useEffect, useState } from 'react';
import { TableFlowGraph } from '../../../../../src';
import { TFGraphNode } from '../../../../../src/types';
import { createClassElement } from '../../../../../src/lib/dom';

type Props = {
  className?: string;
};

const Home: React.FC<Props> = ({ className }) => {
  // const [graphInstance, setGraphInstance] = useState<TableFlowGraph | null>(null)

  const style = ['w-full', 'bg-white', 'relative', 'my-20px', className].join(' ');

  const onChangeLines = (lines: string[][]) => {
    console.log('lines:::::::', lines);
  };

  const renderNode = (node: TFGraphNode, parentElement: HTMLElement) => {
    const el = document.createElement('div');
    switch (node.id) {
      case '1':
        el.className = 'w-full flex py-20px flex-col item-center justify-center';
        const titleEl = createClassElement(
          'div',
          'text-size-18px font-bold text-gray-900 text-center',
          el,
        );
        titleEl.innerText = 'Table Flow Graph';
        const infoEl = createClassElement(
          'div',
          'text-size-14px text-gray-600 text-center mt-20px',
          el,
        );
        infoEl.innerText =
          'A simple flow graph editor/viewer build with html & css (no svg/canvas)';
        break;
      default:
        el.className = 'flex flex-row items-center justify-center';
        el.innerText = node.title;
        break;
    }
    return el;
  };

  useEffect(() => {
    const el = document.getElementById('basic_example');
    new TableFlowGraph(el!, {
      isEditor: false,
      totalColumns: 10,
      totalRows: 10,
      lines: [
        [
          'anchor_2_3_bottom_normalx_offsety',
          'anchor_3_3_center_normalx_normaly',
          'anchor_3_1_right_normalx_normaly',
          'anchor_4_1_topright_normalx_offsety',
        ],
      ],
      nodes: [
        {
          id: '1',
          row: 1,
          rowSpan: 2,
          column: 2,
          colSpan: 6,
          title: 'Table Flow Graph: A simple flow graph editor/viewer build with html & css.',
        },
        {
          id: '2',
          row: 4,
          rowSpan: 2,
          column: 1,
          colSpan: 2,
          title: 'Get Started (WIP)',
        },
      ],
      onChangeLines,
      renderNode,
    });
    // setGraphInstance(instance)
  }, []);

  return <div className={style} id="basic_example"></div>;
};

export default Home;
