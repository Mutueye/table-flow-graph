import { TFGraphNode, TFGraphColumn } from 'table-flow-graph';

export const dataKey = 'example_graph_data';

export type GraphData = { nodes: TFGraphNode[]; columns: TFGraphColumn[]; lines: string[][] };

export const saveGraphData = (data: GraphData) => {
  localStorage.setItem(dataKey, JSON.stringify(data));
};

export const loadGraphData = (): GraphData => {
  const data = localStorage.getItem(dataKey);
  if (data) {
    return JSON.parse(data) as GraphData;
  } else {
    return {
      nodes: [],
      columns: [
        {
          id: '1',
          title: '第一学期',
        },
        {
          id: '2',
          title: '第二学期',
        },
        {
          id: '3',
          title: '第三学期',
        },
        {
          id: '4',
          title: '第四学期',
        },
        {
          id: '5',
          title: '第五学期',
        },
        {
          id: '6',
          title: '第六学期',
        },
        {
          id: '7',
          title: '第七学期',
        },
        {
          id: '8',
          title: '第八学期',
        },
      ],
      lines: [],
    };
  }
};
