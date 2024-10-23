// app/api/files/[username]/route.js

import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data.json');

// Function to read data from JSON
const readData = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
};

// Named export for GET request
export async function GET(req, { params }) {
    const { username } = params; // Get username from URL params
    const data = readData();
    const user = data.users.find(user => user.username === username);

    if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new Response(JSON.stringify({ uploadedFiles: user.uploadedFiles }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
