import React              from 'react';
import ReactDOM           from 'react-dom';

import App    from './components/App';

class Main extends React.Component {
  render() {
    return <App />;
  }
}

ReactDOM.render(<Main />, document.querySelector('#app'));
