import { TFGraphNode } from 'table-flow-graph';

export const dataKey = 'geo_history_graph_data';

export type GraphData = { nodes: TFGraphNode[]; lines: string[][] };

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
      lines: [],
    };
  }
};
