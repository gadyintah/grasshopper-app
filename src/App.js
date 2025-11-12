import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBullet, setCurrentBullet] = useState(null);

  // Messages for each bullet
  const bulletMessages = {
    1: "This is message for bullet 1. Great things start with small beginnings!",
    2: "Bullet 2 message: Consistency is the key to success.",
    3: "Third bullet wisdom: Learn something new every day.",
    4: "Message 4: Embrace challenges as opportunities.",
    5: "Fifth insight: Small steps lead to big achievements.",
    6: "Bullet 6: Stay curious and keep exploring.",
    7: "Lucky number 7: Believe in your journey.",
    8: "Message 8: Progress, not perfection.",
    9: "Ninth bullet: Your potential is limitless.",
    10: "Tenth message: Make today count!",
    11: "Bullet 11: Focus on the process, not just the outcome.",
    12: "Message 12: Growth happens outside your comfort zone.",
    13: "Thirteenth insight: Every expert was once a beginner.",
    14: "Bullet 14: Your attitude determines your direction.",
    15: "Fifteenth message: Small improvements lead to big results.",
    16: "Message 16: Stay positive and persistent.",
    17: "Bullet 17: Learning never exhausts the mind.",
    18: "Eighteenth insight: Quality over quantity.",
    19: "Message 19: Your journey is unique to you.",
    20: "Twentieth bullet: Celebrate small victories.",
    21: "Final message: The best is yet to come!"
  };

  const openModal = (bulletNumber) => {
    setCurrentBullet(bulletNumber);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBullet(null);
  };

  // Create 21 bullets
  const renderBullets = () => {
    const bullets = [];
    for (let i = 1; i <= 21; i++) {
      bullets.push(
        <div
          key={i}
          className="bullet"
          onClick={() => openModal(i)}
        >
          {i}
        </div>
      );
    }
    return bullets;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
        {/* Card Section Added Below Default Content */}
        <div className="card-section">
          <h2 className="card-title">21 Bullets Collection</h2>
          <div className="card">
            <div className="bullets-grid">
              {renderBullets()}
            </div>
          </div>
        </div>
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Bullet {currentBullet}</h2>
            <p>{bulletMessages[currentBullet]}</p>
            <button className="ok-button" onClick={closeModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;