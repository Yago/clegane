/*
  Main
*/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { increment } from '../../actions/items';

class Main extends React.Component {
  buttonGO(event) {
    this.props.increment(2);
  }

  render() {
    return (
      <div>
        <h1>Hello World !</h1>
        <button onClick={this.buttonGO.bind(this)}>click</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

function mapDispachToProps(dispatch) {
  return bindActionCreators({increment}, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Main);
