import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import './App.css';
import './style/button.css';
import DadJokesPage from './DadJokes/DadJokesPage';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul className="nav-list">
            <li className="nav-elm">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-elm">
              <NavLink to="/dad-jokes" className="nav-link">
                Dad Jokes
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dad-jokes" element={<DadJokesPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
