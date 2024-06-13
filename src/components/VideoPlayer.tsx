"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/VideoPlayer.module.css';

interface VideoPlayerProps {
    url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
    const [playbackRate, setPlaybackRate] = useState(1);
    const [volume, setVolume] = useState(1);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playbackRate;
        }
    }, [playbackRate]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    }, [volume]);

    return (
        <div className={styles.videoPlayer}>
            <span>{url}</span>
            <video ref={videoRef} src={url} controls></video>
            <div>
                <label>
                    Playback Speed:
                    <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={playbackRate}
                        onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                    />
                </label>
                <label>
                    Volume:
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                    />
                </label>
            </div>
        </div>
    );
};

export default VideoPlayer;
