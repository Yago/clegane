/*
  App
*/

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Main from '../Main';

function mapStateToProps(state) {
  return {};
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
