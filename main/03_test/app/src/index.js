import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// components
import { Game } from './components/Game';

// ========================================

const history = [{
  squares: Array(9).fill(null),
}];

ReactDOM.render(
  <Game history={history} />,
  document.getElementById('root')
);
