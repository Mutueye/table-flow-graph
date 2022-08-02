import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';

import Wrapper from 'src/components/Wrapper';
import ExampleBasic from './components/ExampleBasic';

const App: React.FC = () => {
  return (
    <Wrapper>
      <ExampleBasic />
    </Wrapper>
  );
};

export default App;
