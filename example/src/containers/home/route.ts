import Home from './pages/Home';
import { RouterRaw } from '../types';

const route: RouterRaw[] = [
  {
    path: '/',
    name: 'home',
    title: '首页',
    component: Home,
  },
];

export default route;
