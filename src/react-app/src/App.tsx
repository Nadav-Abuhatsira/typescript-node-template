import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import './App.css';
import './style/button.css';
import DadJokesPage from './DadJokes/DadJokesPage';
import Home from './Home';
import ChartsPage from './charts/ChartsPage';
import TestPage1 from './test-page-1/TestPage1';

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
            <li className="nav-elm">
              <NavLink to="/charts" className="nav-link">
                Charts
              </NavLink>
            </li>
            <li className="nav-elm">
              <NavLink to="/test-page-1" className="nav-link">
                Test Page 1
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dad-jokes" element={<DadJokesPage />} />
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/test-page-1" element={<TestPage1 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
