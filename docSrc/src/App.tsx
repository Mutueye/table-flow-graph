import { StrictMode } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

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
    </HashRouter>
    // </StrictMode>
  );
};

export default App;
