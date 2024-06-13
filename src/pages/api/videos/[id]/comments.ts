import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { BACKEND_API } from '@/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
        res.status(400).json({ error: 'Invalid video ID' });
        return;
    }

    try {
        const response = await axios.get(`${BACKEND_API}/videos/comments`, { params: { video_id: id } });
        res.status(200).json(response.data);
    } catch (error:any) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
}
