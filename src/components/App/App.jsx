/** @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core'; // eslint-disable-line

import { fetchTV } from 'services/tmdb';
import styles from './App.styles';

const App = ({}) => {
  fetchTV(1432).then(res => console.log(res));
  return <div css={styles}>Sup ?</div>;
};

App.propTypes = {};
App.defaultProps = {};

export default App;
