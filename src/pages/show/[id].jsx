import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { fetchTV } from 'services/tmdb';

const IndexPage = ({ show }) => <div>{show && show.name}</div>;

IndexPage.propTypes = {
  show: PropTypes.object,
};
IndexPage.defaultProps = {};
IndexPage.getInitialProps = async ctx => {
  const show = await fetchTV(ctx.query.id);
  return { show };
};

export default IndexPage;
