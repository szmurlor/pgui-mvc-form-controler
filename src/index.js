import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { DataSet } from "./data.js";

class Station extends React.Component {
  constructor(props) {
    super(props);
    let s = props.station;
    this.state = {
      variance: s.expected - s.value,
      value: s.value,
      color: s.value > s.expected ? "critical" : "auto"
    };
  }

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
                <input type="text" value={s.value} value={this.state.value} />
              </span>
            </li>
            <li>
              <span>Różnica:</span>
              <span>
                <input
                  type="text"
                  readOnly
                  className={this.state.color}
                  readOnly
                  value={this.state.variance}
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
      if (s.id == parseInt(k)) {
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
