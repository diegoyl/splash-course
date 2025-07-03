import React from "react";
import "./DummyPopup.css";

type DummyPopupProps = {
  message: string;
  closeDummyPopup: () => void;
};

// This popsup when clicking things that weren't fully implemented
// alerts intended functionality to the user and tells them to go back

const DummyPopup: React.FC<DummyPopupProps> = ({ message, closeDummyPopup }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>This was not implemented, the intended functionality is: </p>
        <p id="popup-message">{message}</p>
        <button onClick={closeDummyPopup}>Go back</button>
      </div>
    </div>
  );
};

export default DummyPopup;
