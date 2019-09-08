import React from 'react';
import PropTypes from 'prop-types';

import './Bootstrap.scss';

const Bootstrap = ({ children }) => <>{children}</>;

Bootstrap.propTypes = {
  children: PropTypes.node.isRequired,
};
Bootstrap.defaultProps = {};

export default Bootstrap;
