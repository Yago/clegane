import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Blank.scss';

const Blank = ({ prop }) => {
  const [test, setTest] = useState(true);

  return (
    <>
      <h1>Hello {prop}</h1>
      <button type="button" onClick={() => setTest(!test)}>
        {test}
      </button>
    </>
  );
};

Blank.propTypes = {
  prop: PropTypes.string,
};
Blank.defaultProps = {};

export default Blank;
