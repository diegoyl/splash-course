import React, { useState, useEffect } from "react";
import './WatchPage.css'
import type { Video } from "../types.ts"; 

type VideoPlayerProps = {
  video: Video;
};


const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [progress, setProgress] = useState(0); 
    const [duration, setDuration] = useState(0); 


    console.log("url: "+video.url)
    
    const togglePlay = () => {
    if (videoRef.current) {
        if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        } else {
        videoRef.current.pause();
        setIsPlaying(false);
        }
    }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
        videoRef.current.volume = vol;
    }
    };

    const handlePlaybackRateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rate = parseFloat(e.target.value);
    setPlaybackRate(rate);
    if (videoRef.current) {
        videoRef.current.playbackRate = rate;
    }
    };

    const handleFullScreen = () => {
    if (videoRef.current) {
        if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
        } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
        }
    }
    };

    // for video timeline
    React.useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            const percent = (video.currentTime / video.duration) * 100;
            setProgress(percent);
        };

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };

        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, []);
    // END OF UseEffect for video timeline

    const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProgress = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
        }
        setProgress(newProgress);
    };

  return (
    <>
        <div className="video-container" style={{ position: "relative", width: "100%" }}>
            <video ref={videoRef} 
                src="https://www.w3schools.com/html/movie.mp4"
                onClick={togglePlay}
            />
            
            {/* CUSTOM CONTROLS */}
            <div className="custom-video-controls">

                <div className="upper-controls">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleScrubChange}
                        style={{ flex: 1 }}
                    />
                </div>

                <div className="lower-controls">
                    <button onClick={togglePlay}>{isPlaying ? 
                        <i className="fas fa-pause"></i> :
                        <i className="fas fa-play"></i>
                    }</button>

                    <label className="volume-label">
                        <i className="fas fa-volume-high vid-icon"></i>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            style={{ verticalAlign: "middle" }}
                        />
                    </label>

                    {/* GAP */}
                    <div style={{flex:.25}}></div>

                    <label>
                        <select value={playbackRate} onChange={handlePlaybackRateChange}>
                            <option value="0.5">0.5x</option>
                            <option value="1">1x</option>
                            <option value="1.25">1.5x</option>
                            <option value="1.5">1.5x</option>
                            <option value="1.75">1.5x</option>
                            <option value="2">2x</option>
                        </select>
                    </label>

                    <button onClick={handleFullScreen}>
                        <i className="fas fa-expand"></i>
                    </button>
                </div>
            </div>
        </div>
    </>

  );
};

export default VideoPlayer;

