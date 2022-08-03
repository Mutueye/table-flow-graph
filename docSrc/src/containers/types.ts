import * as React from 'react';

export interface RouterRaw {
  path: string;
  name: string;
  title: string;
  component: React.FC;
}
