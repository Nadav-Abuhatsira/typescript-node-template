import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={() => navigate('/dad-jokes')} className="button-17">
        Go to Dad Jokes page
      </button>
    </div>
  );
}
