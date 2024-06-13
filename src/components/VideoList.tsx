"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/VideoList.module.css';
import {USER_ID} from "@/config";

interface Video {
    id: string;
    title: string;
    description: string;
    url: string;
}

const VideoList: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        axios.get('/api/videos', { params: { user_id: USER_ID } }).then(response => {
            setVideos(response.data.videos);
        }).catch(error => {
            console.error('Error fetching videos:', error);
        });
    }, []);

    return (
        <div className={styles.videoList}>
            <h2>Video List</h2>
            <ul>
                {videos.map(video => (
                    <li key={video.id}>
                        <Link href={`/video/${video.id}`}>
                            {video.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VideoList;
