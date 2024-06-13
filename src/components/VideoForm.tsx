"use client";

import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/VideoForm.module.css';
import {USER_ID} from "@/config";

const VideoForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/videos', {
                user_id: USER_ID, // Replace with dynamic user_id if needed
                title,
                description,
                video_url: url,
            });
            setTitle('');
            setDescription('');
            setUrl('');
            alert('Video created successfully!');
        } catch (error) {
            console.error('Error creating video:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.videoForm}>
            <h2>Create a New Video</h2>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label>
                Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
            <label>
                Video URL:
                <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default VideoForm;
