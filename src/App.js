import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBullet, setCurrentBullet] = useState(null);
  const [completedBullets, setCompletedBullets] = useState([]);
  const [nextBullet, setNextBullet] = useState(1);

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

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('bulletProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedBullets(progress.completed || []);
      setNextBullet(progress.next || 1);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    const progress = {
      completed: completedBullets,
      next: nextBullet
    };
    localStorage.setItem('bulletProgress', JSON.stringify(progress));
  }, [completedBullets, nextBullet]);

  const openModal = (bulletNumber) => {
    // Only allow clicking the next bullet in sequence
    if (bulletNumber === nextBullet) {
      setCurrentBullet(bulletNumber);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    if (currentBullet) {
      // Mark current bullet as completed and set next bullet
      setCompletedBullets(prev => [...prev, currentBullet]);
      setNextBullet(prev => prev + 1);
    }
    setIsModalOpen(false);
    setCurrentBullet(null);
  };

  const resetProgress = () => {
    setCompletedBullets([]);
    setNextBullet(1);
    localStorage.removeItem('bulletProgress');
  };

  // Check if all bullets are completed
  const allCompleted = nextBullet > 21;

  // Create 21 bullets with proper styling based on state
  const renderBullets = () => {
    const bullets = [];
    for (let i = 1; i <= 21; i++) {
      const isCompleted = completedBullets.includes(i);
      const isNext = i === nextBullet;
      const isLocked = i > nextBullet;

      let bulletClass = "bullet";
      if (isCompleted) {
        bulletClass += " completed";
      } else if (isNext) {
        bulletClass += " next";
      } else if (isLocked) {
        bulletClass += " locked";
      }

      bullets.push(
        <div
          key={i}
          className={bulletClass}
          onClick={() => openModal(i)}
        >
          {i}
          {isCompleted && <span className="checkmark">✓</span>}
        </div>
      );
    }
    return bullets;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        {/* Progress Indicator */}
        <div className="progress-info">
          <p>Progress: {completedBullets.length}/21 completed</p>
          {!allCompleted && <p>Next: Bullet {nextBullet}</p>}
          {allCompleted && <p className="completed-message">🎉 All bullets completed! 🎉</p>}
        </div>

        {/* Card Section */}
        <div className="card-section">
          <h2 className="card-title">21 expectations moving forward our first meeting after more than 7 years</h2>
          <div className="card">
            <div className="bullets-grid">
              {renderBullets()}
            </div>
          </div>
          
          {/* Reset Button */}
          <button className="reset-button" onClick={resetProgress}>
            Reset Progress
          </button>
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