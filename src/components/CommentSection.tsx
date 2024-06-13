"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/CommentSection.module.css';

interface Comment {
    text: string;
}

interface CommentSectionProps {
    videoId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ videoId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/videos/${videoId}/comments`);
                setComments(response.data.comments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [videoId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`/api/videos/${videoId}/comments`, { text: newComment });
            setNewComment('');
            setComments([...comments, { text: newComment }]);
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <div className={styles.commentSection}>
            <h2>Comments</h2>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment.text}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CommentSection;
