import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import './App.css';
import './style/button.css';
import DadJokesPage from './DadJokes/DadJokesPage';

// Home Page Component
const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={() => navigate('/dad-jokes')} className="button-17">
        Go to Dad Jokes
      </button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul className="nav-list">
            <li className="nav-elm">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-elm">
              <Link to="/dad-jokes" className="nav-link">
                Dad Jokes
              </Link>
            </li>
          </ul>
        </nav>
        {/*Implementing Routes for respective Path */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route path="/about" element={<About />}>*/}
          {/*  <Route path="team" element={<Team />} />*/}
          {/*  <Route path="company" element={<Company />} />*/}
          {/*</Route>*/}
          <Route path="/dad-jokes" element={<DadJokesPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
