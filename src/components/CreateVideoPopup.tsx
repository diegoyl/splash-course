import React, { useState } from "react";
import "./CreateVideoPopup.css";

type CreateVideoPopupProps = {
  closeCreatePopup: () => void;
};

const CreateVideoPopup: React.FC<CreateVideoPopupProps> = ({ closeCreatePopup }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // API STUFF
    try {
      const response = await fetch("https://take-home-assessment-423502.uc.r.appspot.com/api/videos", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          "user_id": "diego_yanezlaguna",
          "description": description,
          "video_url": videoUrl,
          "title": title
        })
      });

      if (!response.ok) throw new Error("Uh oh.... There was an error uploading your video.");

      closeCreatePopup();
    } catch (err) { alert("Uh oh.... There was an error uploading your video."); 
    } finally { setLoading(false); }
  };

  return (
    <div className="create-popup-overlay">
      <div className="create-popup-content">
        <h2>Create New Video</h2>

        <form onSubmit={handleSubmit}>

          {/* INPUT FIELDS: title, description, url */}
          <input
            type="text" placeholder="Title" required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description" className="description" required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text" placeholder="URL" required
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />

          {/* SUBMIT / CANCEL buttons */}
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button className="cancel-button" onClick={closeCreatePopup}>
            Cancel
          </button>
        </form>

      </div>
    </div>
  );
};

export default CreateVideoPopup;
