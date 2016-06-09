/*
  Main
*/

import React from 'react';

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

export default Main;
