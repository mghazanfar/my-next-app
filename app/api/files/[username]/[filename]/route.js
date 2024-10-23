// app/api/files/[username]/[filename]/route.js

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
    const { username, filename } = params;
    const data = readData();
    const user = data.users.find(user => user.username === username);

    if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Find the file in the user's uploaded files
    const uploadedFile = user.uploadedFiles.find(file => file.name === filename);

    if (!uploadedFile) {
        return new Response(JSON.stringify({ error: 'File not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Construct the path to the file (assuming you save files to a public directory)
    const filePath = path.join(process.cwd(), 'public', uploadedFile.name);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return new Response(JSON.stringify({ error: 'File not found on server' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Read the file and return it as a response
    const fileData = fs.readFileSync(filePath);
    return new Response(fileData, {
        status: 200,
        headers: {
            'Content-Type': uploadedFile.type, // Set the appropriate content type
            'Content-Disposition': `attachment; filename=${uploadedFile.name}`, // Optional: To prompt download
        },
    });
}
