import React from 'react';
import PropTypes from 'prop-types';

import { fetchTV } from 'services/tmdb';

const IndexPage = ({ show }) => <div>{show.name}</div>;

IndexPage.propTypes = {
  show: PropTypes.object.isRequired,
};
IndexPage.defaultProps = {};
IndexPage.getInitialProps = async () => {
  const show = await fetchTV(1432);
  return { show };
};

export default IndexPage;
