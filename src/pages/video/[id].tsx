"use client";

import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";
import CommentSection from "@/components/CommentSection";

interface Video {
    id: string;
    title: string;
    description: string;
    url: string;
}

const VideoPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const [video, setVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchVideo = async () => {
                try {
                    console.log('Fetching video with ID:', id); // Debugging line
                    const response = await axios.get(`/api/videos/${id}`);
                    console.log('Video data:', response.data); // Debugging line
                    setVideo(response.data?.video);
                } catch (err: any) {
                    console.error('Error fetching video:', err.message || err);
                    setError('Error fetching video');
                } finally {
                    setLoading(false);
                }
            };

            fetchVideo();
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!video) return <p>No video found</p>;

    return (
        <div>
            <Header />
            <main>
                <h1>{video.title}</h1>
                <VideoPlayer url={video.url} />
                <p>{video.description}</p>
                <CommentSection videoId={id} />
            </main>
        </div>
    );
};

export default VideoPage;
