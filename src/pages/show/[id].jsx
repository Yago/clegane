import React from 'react';
import PropTypes from 'prop-types';

import { fetchTV } from 'services/tmdb';
import Blank from 'components/Blank';

const IndexPage = ({ show }) => (
  <div>
    {show && show.name}
    <Blank />
  </div>
);

IndexPage.propTypes = {
  show: PropTypes.object,
};
IndexPage.defaultProps = {};
IndexPage.getInitialProps = async ctx => {
  const show = await fetchTV(ctx.query.id);
  return { show };
};

export default IndexPage;
