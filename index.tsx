import React, { Component } from 'react';
import { render } from 'react-dom';
import { ClockWrapper } from './ClockWrapper';

import './style.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
          <ClockWrapper city="Toronto" timeOffset="-4" size="220" />
          <ClockWrapper city="Tehran" timeOffset="3.5" size="220" />
          <ClockWrapper city="Phoenix" timeOffset="-7" size="220" />
          <ClockWrapper city="Berlin" timeOffset="2" size="220" />
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById('root'));
