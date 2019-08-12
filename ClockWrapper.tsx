import React, { Component } from 'react';
import { Clock } from './Clock/Clock';

interface IProps {
  size;
  timeOffset;
  city;
}
export class ClockWrapper extends Component<IProps> {

  render() {

    return (
      <div className="time">
        <Clock
          timeOffset={this.props.timeOffset}
          size={this.props.size} />
        <span>{this.props.city}</span>
      </div>
    )

  }

}