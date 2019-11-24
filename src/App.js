import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the Internet of Value!
        </p>
      </header>
      <hr />
      <main className="App-body">
        <h1>Hello RSK!</h1>
        <p>Using a smart contract.</p>
        <div>
          <p>Greeting: <b>...</b></p>
        </div>
        <form >
          <input type="text" className="Greeting-input" />
          <button type="submit" className="Greeting-submit">setGreeting()</button>
        </form>
      </main>
    </div>
  );
}

export default App;
