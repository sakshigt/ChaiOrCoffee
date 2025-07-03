import React, { useState, useEffect, useRef } from 'react';
import ReactConfetti from 'react-confetti';
import './App.css';

function App() {
  const [isYesClicked, setIsYesClicked] = useState(false);
  const [coffeeClicks, setCoffeeClicks] = useState(0);

  const sadAudioRef = useRef(null);
  const happyAudioRef = useRef(null);

  useEffect(() => {
    sadAudioRef.current = new Audio('/BhulaDena.mp3');
    sadAudioRef.current.preload = 'auto';
    happyAudioRef.current = new Audio('/thislove.mp3');
    happyAudioRef.current.preload = 'auto';
  }, []);

  const handleCoffeeClick = () => {
    setCoffeeClicks(prev => prev + 1);
    happyAudioRef.current?.pause();
    sadAudioRef.current?.play().catch(console.error);
  };

  const handleChaiClick = () => {
    setIsYesClicked(true);
    sadAudioRef.current?.pause();
    happyAudioRef.current.currentTime = 0;
    happyAudioRef.current?.play().catch(console.error);
  };

  const chaiMessages = [
    "Perfect match 💑🫖", "Soulmates & Sips ☕❤️", "Masala Wali Mohabbat 🌶️💘",
    "Pyaar, Prem, Chai aur Tum 💖", "Kettle ke kasam! ☕💍", "You passed the vibe test ✔️🧋",
    "Brewed just for you 🫖", "Certified Sweetheart 🍯🫶", "Uff yeh Chai wali love story 😍",
    "Forever wala bond ☕💓", "Not everyone gets it... but you do 💛", "Sunset & Sips 🌇🧋"
  ];

  const coffeeMessages = [
    "Are you sure? 😢", "Really? You'd leave Chai like this? 😭",
    "You're breaking my kettle! 💔🫖","Even the biscuits are crying 🫠🍪",
    "Masala Chai feels betrayed 😪", "Do you even have a heart? 💔☹️",
    "Coffee?? Seriously? 🤡","Your Chai license has been revoked! 🚫🫖",
    "Are you trying to get disowned? 😂",
    "Wait... you’re not even joking? 😶",
    "This is why we can't have nice things 🙃",
    "Fine. Go. Enjoy your bitterness. ☕💔"
  ];

  const getCoffeeMessage = () => coffeeMessages[Math.min(coffeeClicks, coffeeMessages.length - 1)];

  return (
    <div className="app">
      {isYesClicked && <ReactConfetti width={window.innerWidth} height={window.innerHeight} />}
      
      {!isYesClicked ? (
        <>
          <h1>🫖 Chaii or ☕ Coffee? 💖</h1>

          {coffeeClicks > 0 && (
            <div className={`coffee-msg-box ${coffeeClicks > 3 ? 'shake-screen' : ''}`}>
              <p className="coffee-msg">{getCoffeeMessage()}</p>
            </div>
          )}

          {coffeeClicks > 2 && (
            <div className="emoji-rain">
              {Array(40).fill("😭💔🫖☕").map((e, i) => (
                <span key={i} className="emoji" style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * -100}vh`,
                  animationDelay: `${Math.random() * 2}s`
                }}>{e}</span>
              ))}
            </div>
          )}

          <div className="buttons">
            <button className="yes-btn" onClick={handleChaiClick}>
              Chaii 😍
            </button>
            <button className="no-btn dramatic-btn" onClick={handleCoffeeClick}>
              Coffee 🙈
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="final-text">
            Now you're emotinally intelligent!! & welcome to the good-taste company!! 💖🫖
          </h1>
          <div className="chai-rain">
            {Array(40).fill(0).map((_, i) => (
              <span key={i} className="chai-msg" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * -100}vh`,
                animationDelay: `${Math.random()}s`
              }}>
                {chaiMessages[i % chaiMessages.length]}
              </span>
            ))}
          </div>
          <button className="restart-btn" onClick={() => window.location.reload()}>
            🔁 One more time?
          </button>
        </>
      )}
    </div>
  );
}

export default App;
