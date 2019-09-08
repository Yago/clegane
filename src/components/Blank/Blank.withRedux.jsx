/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './Blank.scss';
import { actions as uiActions } from 'store/ui';

const Blank = ({ ui, doSomething }) => {
  const [test, setTest] = useState(true);

  return (
    <>
      <h1>Hello {ui}</h1>
      <button type="button" onClick={() => setTest(!test)}>
        {test}
      </button>
    </>
  );
};

Blank.propTypes = {
  ui: PropTypes.object.isRequired,
  doSomething: PropTypes.func.isRequired,
};
Blank.defaultProps = {};

const mapState = ({ mystore }) => ({ mystore });
const mapDispatch = dispatch => {
  const { doSomething } = uiActions;
  return bindActionCreators({ doSomething }, dispatch);
};

export default connect(
  mapState,
  mapDispatch,
)(Blank);
