import CourseSystem from './pages/CourseSystem';
import GeoHistory from './pages/GeoHistory';
import Playground from './pages/Playground';
import { RouterRaw } from '../types';

const route: RouterRaw[] = [
  {
    path: '/courseSystem',
    name: 'courseSystem',
    title: 'CourseSystem',
    component: CourseSystem,
  },
  {
    path: '/geoHistory',
    name: 'geoHistory',
    title: 'GeoHistory',
    component: GeoHistory,
  },
  {
    path: '/playground',
    name: 'playground',
    title: 'Playground',
    component: Playground,
  },
];

export default route;
