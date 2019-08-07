/** @jsx jsx */
import React, {} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { jsx } from '@emotion/core'; // eslint-disable-line

import styles from './App.styles';
import { actions as mystoreActions } from '../../store/mystore';

const App = ({ mystore, doSomething }) => {
  return (
    <div css={styles}>
      Sup
    </div>
  );
};

App.propTypes = {
  mystore: PropTypes.object.isRequired,
  doSomething: PropTypes.func.isRequired,
};
App.defaultProps = {};

const mapState = ({ mystore }) => ({ mystore });
const mapDispatch = dispatch => {
  const { doSomething } = mystoreActions;
  return bindActionCreators({ doSomething }, dispatch);
};

export default connect(
  mapState,
  mapDispatch,
)(App);
