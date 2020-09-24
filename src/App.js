import React from 'react';
import logo from './logo.svg';
import './App.css';

const a = 5;
const b = true;

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <p style={{
          color: "grey",
          fontSize: "2em",
        }}>
          This string has own style
        </p>

        <p>
          Variable a = {a}
        </p>

        <p>
          Multiplier = {3}
        </p>

        <p>
          op. = {a * 3}
        </p>

        <p>{b && "B = true(logic)"}</p>

        <p>{b ? "B = true(compare)": "B = false(compare)"}</p>

        <p>
          Other:<br/>
          1.undefined - {undefined}<br/>
          2.null - {null}<br/>
          3.true - {true}<br/>
          4.false - {false}
        </p>
      </header>
    </div>
  );
}

export default App;
