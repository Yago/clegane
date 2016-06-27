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
        <Main />
      </div>
    );
  }
}

export default App;
