import React from 'react';
import './App.css';
import * as numbers from './numbers';

const a = 5;
const b = true;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p style={{
          color: "grey",
          fontSize: "2em",
        }}>
          count({numbers.count}) * length({numbers.length}) = {numbers.multiply()}
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
