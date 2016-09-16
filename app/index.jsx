import React from 'react';
import { render } from 'react-dom';

// Import Components
import App from './components/App';
import Discover from './views/Discover';
import Details from './views/Details';

// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Discover}></IndexRoute>

        {/* Discover */}
        <Route path="movie/popular/:page" component={Discover}></Route>
        <Route path="movie/now_playing/:page" component={Discover}></Route>
        <Route path="movie/upcoming/:page" component={Discover}></Route>

        <Route path="movie/:id" component={Details}></Route>
        <Route path="tv/:id" component={Details}></Route>
        <Route path="person/:id" component={Details}></Route>
        <Route path="search/:query" component={Details}></Route>
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('app'));
