// app/api/share/route.js
import { v4 as uuidv4 } from 'uuid';

const sharedFiles = {}; // Use a database for production

export async function POST(req) {
    const { fileId } = await req.json();

    if (!fileId) {
        return new Response(JSON.stringify({ error: 'File ID is required' }), { status: 400 });
    }

    // Generate a unique shareable link
    const shareableLink = `http://localhost:3000/shared/${uuidv4()}`;
    sharedFiles[shareableLink] = fileId; // Map link to file ID

    return new Response(JSON.stringify({ link: shareableLink }), { status: 200 });
}
