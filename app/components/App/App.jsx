/*
  App
*/

import React from 'react';
import Main from '../Main';
import Sidebar from '../Sidebar';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Sidebar />
        {React.cloneElement(this.props.children)}
      </div>
    );
  }
}

export default App;
