// pages/api/share.js
import { v4 as uuidv4 } from 'uuid';

const sharedFiles = {}; // In-memory store for shared files

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { fileId } = req.body;

        if (!fileId) {
            return res.status(400).json({ error: 'File ID is required' });
        }

        // Generate a unique shareable link
        const shareableLink = `http://localhost:3000/shared/${uuidv4()}`;
        sharedFiles[shareableLink] = fileId; // Map link to file ID

        res.status(200).json({ link: shareableLink });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
