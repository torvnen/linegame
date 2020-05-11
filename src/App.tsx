import React from 'react';
import './App.css';
import Game from './classes/Game';
import { Board } from './components/Board';

function App() {
  return (
    <Board game={new Game()} />
  );
}

export default App;
