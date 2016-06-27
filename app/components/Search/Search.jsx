/*
  Search
*/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import Awesomplete from 'awesomplete';

import { getTmdbResults } from '../../actions/tmdb';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.query = '';
  }

  // Init Awesomplete
  componentDidMount() {
    const input = document.getElementById('search');
    this.autocomplete = new Awesomplete(input, {
      autoFirst: true,
      maxItems: 100,
      list: [],
      sort: () => {}
    });

    document.addEventListener('awesomplete-select', e => {
      e.preventDefault();
      this.autocomplete.close();
      this.props.browserHistory.push(event.text.value);
    });
  }

  // Update Awesomplete list with new results
  componentWillUpdate(nextProps, nextState) {
    // clean list
    this.autocomplete._list = [];

    if (nextProps.tmdb.results && nextProps.tmdb.results.length > 0) {
      this.query = this.autocomplete.input.value;

      // Add “see all results”
      this.autocomplete._list.push([
        `<i>${this.query}</i><b>SEE ALL RESULTS</b>`,
        `/search/${encodeURIComponent(this.query)}`
      ]);

      // Populate new data adn refresh autocomplete
      nextProps.tmdb.results.map(result => {
        const id = result.id,
              title = result.original_title ? result.original_title : result.original_name ? result.original_name : result.name,
              date = result.first_air_date ? result.first_air_date : result.release_date ? result.release_date : null,
              type = result.media_type,
              label = date ? `<b>${title}</b> - ${date.split('-')[0]}` : `<b>${title}</b>`,
              value = `/${type}/${id}`;

        this.autocomplete._list.push([label, value]);
      });
      this.autocomplete.evaluate();
    }
  }

  // Handle autocomplete refresh on input change
  handleAutocomplete() {
    if (this.refs.search.value.length > 2) {
      this.props.getTmdbResults(this.refs.search.value);
    }
  }

  render() {
    let results = '';
    if (this.props.tmdb.results) {
      results = Object.keys(this.props.tmdb.results).map((id, key) => {
        const result = this.props.tmdb.results[id];
        return (<li key={key}>{result.title}</li>);
      });
    }

    return (
      <div>
        <div className="search">
          <input
            type="text"
            id="search"
            placeholder="Movie, TV Show, People,..."
            ref="search"
            onChange={this.handleAutocomplete.bind(this)}
          />
          <span className="search-btn">
            <Link to={`/search/${encodeURIComponent(this.query)}`} className="btn btn-main">
              <i className="icon icon-search"></i>
            </Link>
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tmdb: state.tmdb,
    browserHistory
  };
}

function mapDispachToProps(dispatch) {
  return bindActionCreators({
    getTmdbResults
  }, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Search);
