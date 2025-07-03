import React, { useState, useEffect } from "react";
import './ListPage.css'
import type { Video } from "../types.ts"; 

type ListPageProps = {
  onSelectVideo: (video: Video) => void;
  openDummyPopup: (message:string) => void;
  myUsername: string;
};

const dummyVideos:Video[] = [
  { video_id: "1", url:"", creator: "Dolphin", title: "Swimming 101", description: "Learn how to swim!" },
  { video_id: "2", url:"", creator: "Humpack Whale", title: "Singing Basics", description: "Ooooauuaouauouauuoauua Euoeeeueuoeuauou" },
  { video_id: "3", url:"", creator: "Great White Shark", title: "Intro to Healthy Eating", description: "We will go over which fish are the healthiest (and yummiest) for you to eat" },
  { video_id: "4", url:"", creator: "Octopus", title: "The Art of Camouflage", description: "How to hide from your enemies... or your prey" },
  { video_id: "5", url:"", creator: "Crab", title: "Coral Gardening 101", description: "If your coral is always dying, this video is for you" },
  { video_id: "6", url:"", creator: "Plankton", title: "Heist Logistics", description: "In this course you will create a master plan to steal the krabby patty secret formula" },
  { video_id: "7", url:"", creator: "Dory", title: "Just Keep Swimming", description: "Learn how to stay positive when facing obstacles" },
];

const ListPage: React.FC<ListPageProps> = ({ onSelectVideo, openDummyPopup, myUsername }) => {
  const [currentVideos, setCurrentVideos] = useState<Video[]>(dummyVideos);
  const [videoCategory, setVideoCategory] = useState<string>("all");

  const handleFilter = () => { openDummyPopup("Open filters menu") }

  const changVideoCategory = async (category:string) => {
    let newVideoList:Video[] = [];
    if (category === "all") {
      newVideoList = dummyVideos
    } 
    else if (category === "user") {
      newVideoList = await getUserVids()
    } 

    setVideoCategory(category)
    setCurrentVideos(newVideoList)
  }

  const getUserVids = async () => {
    const user_id = "diego_yanezlaguna"
    let userVids:Video[] = [];
    
    // API STUFF
    try {
      const response = await fetch(`/api/videos?user_id=${user_id}`);
      if (!response.ok) {
        throw new Error(`Oh noooo, error fecthing videos: ${response.status}`);
      }

      const data = await response.json();
      const rawVideoList = data.videos;
            
      // mapping api data to video object
      for (const vid_data of rawVideoList) {
        const newVid: Video = {
          video_id: vid_data.id,
          title: vid_data.title,
          description: vid_data.description,
          url: vid_data.video_url,
          creator: vid_data.user_id,
        };
        userVids.push(newVid);
      }

      return userVids

    } catch (error) {
      console.error(error);
      return [];
    }
  }


  return (
    <div className="content-page">
      <div className="list-page-container">
        <h1>What do you want to learn <span style={{color:"var(--color-highlight)"}}>
            {myUsername}</span>?
        </h1>
        
        {/* List filter buttons */}
        <div id="vid-list-buttons">
          <button className={videoCategory === "all" ? "active-vid-btn":""} onClick={() => changVideoCategory("all")}>All Videos</button>
          <button className={videoCategory === "user" ? "active-vid-btn":""}  onClick={() => changVideoCategory("user")}>Your Videos</button>
          <button className="filter-btn" onClick={handleFilter}>
              <i className="fas fa-filter"></i>
          </button>
        </div>

      {/* Maybe this shud be a component */}
        <div id="video-list-container">
          {currentVideos.map((video) => (
            <div key={video.video_id} className="listed-video" 
              onClick={() => onSelectVideo(video)}>
                <div className="video-thumb"></div>
                <div className="info-panel">
                  <h2>{video.title}</h2>
                  <h3>{video.creator || myUsername}</h3>
                  <h4>{video.description}</h4>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default ListPage;
