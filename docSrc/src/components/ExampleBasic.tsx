import React, { useEffect, useState } from 'react';
import { TableFlowGraph } from '../../../src';

type Props = {
  className?: string;
};

const ExampleBasic: React.FC<Props> = ({ className }) => {
  // const [graphInstance, setGraphInstance] = useState<TableFlowGraph | null>(null)

  const style = ['w-full', 'bg-white', 'relative', 'my-20px', className].join(' ');

  const onChangeLines = (lines: string[][]) => {
    console.log('lines:::::::', lines);
  };

  useEffect(() => {
    const el = document.getElementById('basic_example');
    new TableFlowGraph(el!, {
      isEditor: true,
      totalColumns: 10,
      totalRows: 10,
      nodes: [
        {
          row: 1,
          rowSpan: 1,
          column: 2,
          colSpan: 6,
          title: 'Table Flow Graph: A simple flow graph editor/viewer build by pure html&css.',
        },
        {
          row: 3,
          rowSpan: 2,
          column: 1,
          colSpan: 2,
          title: 'Get Started',
        },
      ],
      onChangeLines,
    });
    // setGraphInstance(instance)
  }, []);

  return <div className={style} id="basic_example"></div>;
};

export default ExampleBasic;
