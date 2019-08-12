import React, { Component } from 'react';
import "./Clock.css";

interface IProp {
  size;
  timeOffset;
}
interface IState {
  hourAngle: number;
  minAngle: number;
  secAngle: number;
  dateText: string;
}

export class Clock extends Component<IProp, IState>{
  middle = 0;

  constructor(props) {
    super(props);

    this.state = {
      hourAngle: 0,
      minAngle: 0,
      secAngle: 0,
      dateText: "0"
    }
  }

  componentDidMount() {
    let ticks = this.refs.ticks as SVGElement;
    this.addTicks(ticks)

    this.update();
    setInterval(this.update.bind(this), 1000);
  }

  update() {

    let timeOffset = this.props.timeOffset;

    let d = new Date();
    let date = new Date(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      d.getUTCHours(),
      d.getUTCMinutes(),
      d.getUTCSeconds(),
      d.getUTCMilliseconds());

    date.setMilliseconds(
      d.getUTCMilliseconds() + (timeOffset * 60 * 60 * 1000));

    let sec = date.getSeconds();
    let min = date.getMinutes() + sec / 60;
    let hour = date.getHours() + min / 60;
    let day = date.getDate();
    let sDay = (day < 10) ? ("0" + day) : day.toString();

    let adjust = 30;
    let secAngle = (sec - adjust) * 6;
    let minAngle = (min - adjust) * 6;
    let hourAngle = (hour - adjust) * 30;
    let dateText = sDay;

    this.setState({ secAngle, minAngle, hourAngle, dateText });
  }

  createSVGElement(type: string) {
    return document.createElementNS("http://www.w3.org/2000/svg", type);
  }

  addTicks(faceGroup: SVGElement) {
    let midPoint = this.middle;
    let minuteAngle = (Math.PI) / 30;
    for (let i = 0; i <= 60; i++) {
      let x = Math.cos(i * minuteAngle);
      let y = Math.sin(i * minuteAngle);
      let x1 = midPoint + midPoint / 1.15 * x;
      let y1 = midPoint + midPoint / 1.15 * y;

      let isHourMarker = (i % 5) == 0;
      let x2 = midPoint + midPoint / (isHourMarker ? 1.25 : 1.2) * x;
      let y2 = midPoint + midPoint / (isHourMarker ? 1.25 : 1.2) * y;

      let tick = this.createSVGElement("line");
      tick.setAttribute("x1", x1.toString());
      tick.setAttribute("y1", y1.toString());
      tick.setAttribute("x2", x2.toString());
      tick.setAttribute("y2", y2.toString());

      if (isHourMarker && i != 0) {
        let numbers = this.refs.numbers as SVGElement;
        let text = this.createSVGElement("text");
        let value = (i / 5).toString();
        let xa = midPoint * Math.cos((i - 15) * minuteAngle);
        let ya = midPoint * Math.sin((i - 15) * minuteAngle);

        let x = (xa / 1.4).toString();
        let y = (ya / 1.4).toString();
        text.textContent = value;
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("y", y);
        text.setAttribute("x", x);
        numbers.appendChild(text);
      }
      faceGroup.appendChild(tick);
    }
  }

  render() {
    let { size } = this.props;
    let middle = size / 2;
    this.middle = middle;
    let fontSize = (middle / 6.8);

    return (<svg className="clock" width={size} height={size}>
      <circle
        className="border"
        cx={middle}
        cy={middle}
        r={middle - middle / 20}
        strokeWidth={middle / 20} />

      <g className="ticks" ref="ticks" />

      <g className="numbers"
        transform={`translate(${middle} ${middle + middle / 20})`}
        fontSize={fontSize}
        ref="numbers" />

      <rect
        className="dateRect"
        fill="none"
        x={1.4 * middle}
        y={middle - middle / 15}
        width={middle / 7.5}
        height={middle / 7.5} />

      <text
        className="dateText"
        x={1.4 * middle + middle / 50}
        y={middle + middle / 25}
        fontSize={fontSize / 1.5}
      >{this.state.dateText}</text>

      <line
        className="hourHand"
        strokeWidth={middle / 12.5}
        transform={`rotate(${this.state.hourAngle} ${middle} ${middle})`}
        x1={middle}
        x2={middle}
        y1={middle - middle / 5}
        y2={1.55 * middle} />

      <line
        className="minuteHand"
        strokeWidth={middle / 20}
        transform={`rotate(${this.state.minAngle} ${middle} ${middle})`}
        x1={middle}
        x2={middle}
        y1={middle - middle / 5}
        y2={1.75 * middle} />

      <line
        className="secondHand"
        strokeWidth={middle / 50}
        transform={`rotate(${this.state.secAngle} ${middle} ${middle})`}
        x1={middle}
        x2={middle}
        y1={middle - middle / 5}
        y2={1.8 * middle} />

      <circle
        className="pin"
        cx={middle}
        cy={middle}
        r={middle / 20}
        strokeWidth={middle / 40} />

    </svg>);
  }

}
