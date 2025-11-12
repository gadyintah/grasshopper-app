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
    1: "First of all, ADVANCE HAPPY BIRTHDAY 🎂🎁🎉. If yours was a BAT file, mine would be a webpage and I hope you like it. Kinda rusty pero this is as far as I can do for a 1 day sitting",
    2: "Secondly, I would like to say that I appreciate you taking the time to meet with me after all these years. Never knew it would be possible still since we lost contact and we don't talk that much anymore.",
    3: "Thirdly, I hope we can have fun catching up and reminiscing about old times while also looking forward to new opportunities ahead.",
    4: "Fourth, tama na ng default messages, let's get to the point na. I hope this little app brings a smile to your face and reminds you of the good times we've shared over the years especially nung una kahit di na natin ma alala most of it",
    5: "Fifth would be sana we can continue to stay in touch even after we meet. Hoping it won't be the first and last time.",
    6: "I remember you calling young grasshoper kasi I believe it was the time na nanunuod ako ng Star Wars nun and young padawan dapat yun. Pero I guess grasshopper is cooler and much more appropriate for someone who's always learning and growing such as yourself.",
    7: "Lucky number 7: My wish for you kahit di mo pa birthday is that kahit di tayo always nagkakausap or nagkikita, sana lagi kang maging masaya at matagumpay sa lahat ng iyong endeavors. You deserve nothing but the best. We all do.",
    8: "Eight message would be, I guess itigil ko na yung pag count kasi may number naman sa page so, last na ata to para di na din ako mag type ng sobra at ayon na nga nag explain na si ferson. Hahahaha. Pero yun nga, san we can continue to stay in touch and make more memories together in the future.",
    9: "After our first meeting in more than 7 years, I hope we can look back on this day as a special moment in our friendship and relationship. Parang lucky 7 today. Hahaha. Historical Even ulit.",
    10: "I liked talking to you before as far as I can remember kasi you were genuine nga, today I'd say nonchalant so parang you're great to talk to and kahit nagalit ka sa MOMO, kinausap mo pa din ako and sana napatawad mo na talaga ako. Hahahaha",
    11: "Prime number 11, I like this number kasi it's unique and special just like our friendship. Sana we can continue to nurture and grow our bond over time. It's okay kahit staggered or intermittent basta we still do. Life gets busy after all.",
    12: "I don't know much about you recently pero from time to time I see you sa feed ko, sa stories and posts mo, pero minsan nahihiya ako mag reach out kaya I appreciate you taking the initiative to message me and ask if I'm doing well. It means a lot to me.",
    13: "Enough about me and my memories and thoughts, I hope our first meeting will bring you at least a bit more joy and happiness that will make your viber profile photo more accurate.",
    14: "Ilang numbers na lang ba natitira? Hahahaha. Fourteen na ata to. I hope this little app serves as a reminder of the good times we've shared and the potential for more memories to come. Since 7 years na ata tayong friends(ata) baka sa 14th year we can have a simple memory lane hang out if ever possible. Hahahahaha. Ilagay ko sa Calendar ko pati link ng app na to para di ko makalimutan. Hahahaha",
    15: "Juarez, yan tawag ko sayo after ko malaman na Juarez yung middle name mo. I thought it was cool kasi parang hispanic, same with my middle name na Brizuela.",
    16: "I'll share nalang some thoughts about you na naaalala ko. Alam ko mabait ka online, thoughtful din, nagawan mo pa nga ako ng present which is a gift from the past and now a thought for the future eyyyyy. Hahahaha. Sincere ka din, I can see that in the way you express yourself and interact with me.",
    17: "Prime number 17 pag inadd mo yung digits niya 1+7 = 8, tapos if irotate mo siya ng 90 degrees magiging infinity symbol siya. Parang friendship natin na sana mag last ng matagal at walang hangganan. Hahahaha. Corny no.",
    18: "Pero again about you na na aalala ko, you were so interactive before and kahit na we had our indifferences, you still made an effort to reach out and connect with me. I appreciate that a lot.",
    19: "You were also very pretty sa kada selfies mo na naaalala ko, sana ganun pa din ngayon. Hahahaha. Kidding aside, I hope you continue to embrace your unique beauty and personality because that's what makes you special, Juarez. Beauty, brains, and kindness in one package.",
    20: "Dapat 18 lang eh kasi 18 ang debut ng female sa Pilipinas pero sige na nga 21 na to para pantay tayo. Hahahaha. You made an effort before, let me try making mine now.",
    21: "Final message: Thank you for taking the time to meet with me today and for being a part of my life. I hope we can continue to stay in touch and make more memories together in the future. Happy Birthday once again, Juarez! 🎉🎂🎁"
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
          <h2 className="card-title">21 Fun Facts for our first meeting after more than 7 years</h2>
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
            <h2>Message {currentBullet}</h2>
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