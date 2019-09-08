import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';

import makeStore from 'store/index';
import Bootstrap from 'components/Bootstrap';

class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Bootstrap>
            <Component {...pageProps} />
          </Bootstrap>
        </Provider>
      </Container>
    );
  }
}

CustomApp.propTypes = {
  Component: PropTypes.node.isRequired,
  pageProps: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default withRedux(makeStore)(App);
