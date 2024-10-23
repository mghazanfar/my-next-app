// app/api/files/upload/route.js

import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data.json');

// Function to read data from JSON
const readData = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
};

// Function to write data to JSON
const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Named export for POST request
export async function POST(req) {
    const { username, file, tags } = await req.json(); // Get username, file, and tags from request body
    const data = readData();
    const user = data.users.find(user => user.username === username);

    if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Construct a shareable link to the file details page
    const shareableLink = `http://localhost:3000/files/${username}/${file.name}`;


    // Add the new file to the user's uploadedFiles
    const newFile = {
        name: file.name,
        type: file.type,
        tags: tags,
        uploadedAt: new Date().toISOString(), // Add a timestamp
        shareableLink, // Add the shareable link
    };

    user.uploadedFiles.push(newFile);

    // Write updated data back to JSON
    writeData(data);

    return new Response(JSON.stringify({ file: newFile }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
