import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { DataSet } from "./data.js";

class StationViewModel {
  constructor(station) {
    // CLONE
    this.station = { ...station };
  }

  setValue(newValue) {
    this.station.value = newValue;
  }

  getValue() {
    return this.station.value;
  }

  setStation(s) {
    // CLONE
    this.station = { ...s };
  }

  getColorClass() {
    let s = this.station;
    return s.value > s.expected ? "critical" : "auto";
  }

  getVariance() {
    let s = this.station;
    return s.expected - s.value;
  }
}

class Station extends React.Component {
  constructor(props) {
    super(props);
    let s = props.station;
    this.state = {
      model: new StationViewModel(s)
    };
    this.refVariance = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    // this.setState(state => {
    //   state.model.setStation(nextProps.station);
    //   return state;
    // });
    this.setState(state => {
      state.model = new StationViewModel(nextProps.station);
      return state;
    });
  }

  onChangedValue = e => {
    var v = e.target.value;
    this.setState(state => {
      state.model.setValue(parseInt(v, 10));
      return state;
    });
  };

  render() {
    var s = this.props.station;
    return (
      <div className="details">
        <form>
          <ul>
            <li>
              <span>Identyfikator:</span>
              <span>
                <input type="text" readOnly value={s.name} />
              </span>
            </li>
            <li>
              <span>Data pomiaru:</span>
              <span>
                <input type="text" readOnly value={s.date} />
              </span>
            </li>
            <li>
              <span>Oczekiwana:</span>
              <span>
                <input type="text" readOnly value={s.expected} />
              </span>
            </li>
            <li>
              <span>Zmierzona:</span>
              <span>
                <input
                  type="text"
                  value={this.state.model.getValue()}
                  onChange={this.onChangedValue}
                />
              </span>
            </li>
            <li>
              <span>Różnica:</span>
              <span>
                <input
                  ref={this.refVariance}
                  type="text"
                  readOnly
                  value={this.state.model.getVariance()}
                  className={this.state.model.getColorClass()}
                />
              </span>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: DataSet,
      selected: undefined
    };
  }

  selected = e => {
    var selected = undefined;
    var k = e.target.value;
    for (var idx in this.state.data.stations) {
      var s = this.state.data.stations[idx];
      if (s.id === parseInt(k)) {
        selected = s;
        break;
      }
    }
    this.setState({
      selected: selected
    });
  };

  render() {
    return (
      <div className="App">
        <div className="left">
          <select
            className="stations"
            name="stations"
            onChange={this.selected}
            multiple
          >
            {this.state.data.stations.map(s => {
              return (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="right">
          {this.state.selected && <Station station={this.state.selected} />}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
