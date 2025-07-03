import { useState } from 'react'
import "./LandingPage.css"
type LandingPageProps = {
  onContinue: () => void;
  setMyUsername: (username: string) => void;
};

const LandingPage: React.FC<LandingPageProps> = ({ onContinue, setMyUsername }) => {
  
  const [usernameInput, setUsernameInput] = useState("");

  const handleContinue = () => {
    if (usernameInput !== "") {
      setMyUsername(usernameInput);
      onContinue();
    }
  };

  return (
    <div className="landing-page-container">
      
      {/* BACKGROUND OCEAN VIDEO */}
      <video autoPlay muted loop playsInline
        className="background-video"
        src="./ocean.mp4"
      />

      <div className="landing-content">

        {/* "logo" */}
        <h1 style={{fontWeight:"bold",fontSize:"4em"}} >
          <span style={{color:"var(--color-highlight)"}}>Splash</span>
          <span style={{color:"var(--color-logo2)"}}>Course</span>
        </h1>
        
        {/* ha ha */}
        <p>Welcome to Splash Course, an <em>ocean</em> of educational videos!</p>
          
        <div className="username-input">
          <input
            type="text" placeholder="Pick a username" 
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="input-field"
          />
          <button  onClick={handleContinue} 
            disabled={usernameInput === ""}
            className="input-field"
          >
            Dive In!
          </button>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;
