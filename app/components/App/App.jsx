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
      </div>
    );
  }
}

export default App;
