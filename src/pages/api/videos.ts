import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { BACKEND_API } from '@/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            const { user_id } = req.query;
            try {
                const response = await axios.get(`${BACKEND_API}/videos`, { params: { user_id } });
                res.status(200).json(response.data);
            } catch (error) {
                res.status(500).json({ error: 'Error fetching videos' });
            }
            break;
        case 'POST':
            try {
                const response = await axios.post(`${BACKEND_API}/videos`, req.body, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                res.status(201).json(response.data);
            } catch (error) {
                res.status(500).json({ error: 'Error creating video' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
