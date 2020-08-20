import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
//import Landing from './components/layout/Landing';
import HomeScreen from './components/layout/HomeScreen';
import Routes from './components/routing/Routes';
//import ButtonAppBar from '../src/components/layout/NavbarUI';
// Redux
import FullWidthGrid from './components/layout/PHS';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />

          <Switch>
            <Route exact path='/' component={FullWidthGrid} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
