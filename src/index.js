import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { DataSet } from "./data.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: DataSet,
      selected: undefined
    };
  }

  render() {
    return (
      <div className="App">
        <div className="left">
          <select className="stations" name="stations" multiple>
            {this.state.data.stations.map(s => {
              return (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="right">Tutaj będzie nasza stacja</div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
