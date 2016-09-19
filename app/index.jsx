import React from 'react';
import { render } from 'react-dom';

// Import Components
import App from './components/App';
import Discover from './views/Discover';
import Movie from './views/Movie';

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
        <Route path="movie/popular/:page" component={Discover} title="Popular Movies"></Route>
        <Route path="movie/now_playing/:page" component={Discover} title="movies now playing"></Route>
        <Route path="movie/upcoming/:page" component={Discover} title="Upcoming movies"></Route>
        <Route path="tv/popular/:page" component={Discover} title="Popular TV Shows"></Route>
        <Route path="tv/airing_today/:page" component={Discover} title="Airing today TV Shows"></Route>
        <Route path="tv/on_the_air/:page" component={Discover} title="On the Air TV Shows"></Route>
        <Route path="person/popular/:page" component={Discover} title="Popular people"></Route>

        {/* Details */}
        <Route path="movie/:id" component={Movie}></Route>

        <Route path="search/:query" component={Movie}></Route>
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('app'));
