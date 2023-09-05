import { TFGraphNode, TFGraphColumn } from 'table-flow-graph';

export type GraphDataKey = 'course_system' | 'geo_history' | 'playground';

// export const dataKey = 'example_graph_data';

export type GraphData = { nodes: TFGraphNode[]; columns: TFGraphColumn[]; lines: string[][] };

export const saveGraphData = (dataKey: GraphDataKey, data: GraphData) => {
  localStorage.setItem(dataKey, JSON.stringify(data));
};

export const loadGraphData = (dataKey: GraphDataKey, defaultData?: GraphData): GraphData => {
  const data = localStorage.getItem(dataKey);
  if (data) {
    return JSON.parse(data) as GraphData;
  } else {
    const newData = defaultData
      ? defaultData
      : {
          nodes: [],
          columns: [],
          lines: [],
        };
    saveGraphData(dataKey, newData);
    return newData;
  }
};
