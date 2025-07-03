import React, { useState } from "react";
import './WatchPage.css'
import VideoPlayer from './VideoPlayer.tsx'
import CommentSection from './CommentSection.tsx';
import type { Video } from "../types.ts"; 

type WatchPageProps = {
  video: Video;
  onBack: () => void;
  openDummyPopup: (message:string) => void;
  myUsername: string;
};

const WatchPage: React.FC<WatchPageProps> = ({ video, onBack, openDummyPopup, myUsername }) => {

  return (
    <div className="watch-container">

      {/* VIDEO PANE */}
      <div className="left-pane">  
        <VideoPlayer video={video}/>
        <h2>{video.title}</h2>
        <h3>{video.creator}</h3>
        <p>{video.description}</p>
      </div>

      {/* COMMENT SECTION */}
      <div className="right-pane">
        <div className="sticky-comment-header">
          <button id="all-videosbutton" onClick={onBack}>All Videos</button>
          <h2>Comments</h2>
        </div>

        <CommentSection
          video_id={video.video_id}
          myUsername={myUsername}
        />

      </div>
    </div>
  );
};

export default WatchPage;

