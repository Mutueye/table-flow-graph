import Example from './pages/Example';
import { RouterRaw } from '../types';

const route: RouterRaw[] = [
  {
    path: '/example',
    name: 'example',
    title: 'Example',
    component: Example,
  },
];

export default route;
