import { BrowserRouter as Router } from 'react-router-dom';
import {FoodProvider} from './hooks/useFood'

import Routes from './routes';

import GlobalStyle from './styles/global';

const App = () => (
  <Router>
  <FoodProvider>
    <GlobalStyle />
      <Routes />
  </FoodProvider>
  </Router>
);

export default App;


