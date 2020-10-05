import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStarted: false,
      timerStopped: true,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }
  /*---------------------------*/////
  handleTimerStart(e) {
    e.preventDefault();
    if (this.state.timerStopped) {
      this.timer = setInterval(() => {
        this.setState({ timerStarted: true, timerStopped: false });
        if (this.state.timerStarted) {
          if (this.state.seconds > 58) {
            this.setState(prevState => ({
              minutes: prevState.minutes + 1,
              seconds: -1
            }));
          }
          if (this.state.minutes > 59) {
            this.setState(prevState => ({
              hours: prevState.hours + 1,
              minutes: 0,
              seconds: -1
            }));
          }
          this.setState(prevState => ({ seconds: prevState.seconds + 1 }));
        }
      }, 1000);
    }
  }

  /*----------------------------------------------*/
  handleTimerStop() {
    this.setState({ timerStarted: false, timerStopped: true });
    clearInterval(this.timer);
  }
  /*----------------------------------------------------*/
  handleTimerReset() {
    this.setState({
      timerStarted: false,
      timerStopped: true,
      seconds: 0,
      minutes: 0,
      hours: 0
    });
    clearInterval(this.timer);
  }

  /*----------------------------------------------*/
  render() {
    return (
      <div className="time-container">
        <div className="timeBackground">
        <div className="time-inner-container">
          <div className="time-digits">
            {String(this.state.hours).padStart(2, "0")} :
            {String(this.state.minutes).padStart(2, "0")} :
            {String(this.state.seconds).padStart(2, "0")}
          </div>
          <div className="time-text">
            <div className="time-text-item">Hour</div>
            <div className="time-text-item">Minute</div>
            <div className="time-text-item">Second</div>
          </div>
        </div>

        <br />
        <div className="btn-container">
        <button
          className="button orange shield glossy"
          data-icon="♚"
          onClick={this.handleTimerStart.bind(this)}
        >
          Start Timer
        </button>
        <button
          className="button orange shield glossy"
          data-icon="♛"
          onClick={this.handleTimerStop.bind(this)}
        >
          Stop Timer
        </button>
        <button
          className="button orange shield glossy"
          data-icon="♞"
          onClick={this.handleTimerReset.bind(this)}
        >
          Reset!
        </button>
        </div>
        </div>
      </div>
    );
  }
}

export default Timer;
// ReactDOM.render(<Timer />, document.getElementById("root"));
