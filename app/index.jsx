import React from 'react';
import { render } from 'react-dom';

// Import Components
import App from './components/App';
import Main from './views/Main';
import Details from './views/Details';

// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Main}></IndexRoute>
        <Route path="movie/:id" component={Details}></Route>
        <Route path="tv/:id" component={Details}></Route>
        <Route path="person/:id" component={Details}></Route>
        <Route path="search/:query" component={Details}></Route>
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('app'));
