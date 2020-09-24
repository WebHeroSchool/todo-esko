import React from 'react';

const ListItem = () => (
  <ol>
    <li>1st task</li>
    <li>2nd task</li>
    <li>3rd task</li>
  </ol>
);

const App = () => (
  <div>
    <h1>Current tasks:</h1>
    <ListItem />
  </div>
);

export default App;