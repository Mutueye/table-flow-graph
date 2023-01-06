// import { StrictMode } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
// import { MenuOutlined, GithubOutlined } from '@ant-design/icons';

import Wrapper from 'src/components/Wrapper';
import { RouterRaw } from './containers/types';

const routes = (() => {
  const files: Record<string, { default: RouterRaw[] }> = import.meta.glob(
    '/src/containers/**/route.ts',
    {
      eager: true,
    },
  );
  let routes: RouterRaw[] = [];

  Object.keys(files).forEach((key) => {
    routes = routes.concat(files[key].default);
  });
  console.log('routes::::::', routes);
  return routes;
})();

const App: React.FC = () => {
  return (
    // react 18 StrictMode useEffect will run twice in dev mode
    // <StrictMode>
    <HashRouter>
      <Wrapper>
        <Routes>
          {routes.map((route) => (
            <Route key={route.name} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </Wrapper>
      {/* <div className="absolute w-50px h-50px left-10px top-10px bg-transparent group cursor-pointer flex items-center justify-center hover:bg-gray-100">
        <MenuOutlined className="text-gray-500 text-size-28px leading-0px group-hover:text-theme" />
      </div>
      <div className="absolute w-50px h-50px right-10px top-10px bg-transparent group cursor-pointer flex items-center justify-center hover:bg-gray-100">
        <GithubOutlined className="text-gray-500 text-size-28px leading-0px group-hover:text-theme" />
      </div> */}
    </HashRouter>
    // </StrictMode>
  );
};

export default App;
