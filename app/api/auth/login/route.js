import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data.json');

// Helper function to read data from the JSON file
const readData = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
};

export async function POST(req) {
    const { username, password } = await req.json();
    const data = readData();

    const user = data.users.find(user => user.username === username);
    if (!user) {
        return new Response(JSON.stringify({ error: 'User not found!' }), { status: 404 });
    }

    if (user.password !== password) {
        return new Response(JSON.stringify({ error: 'Invalid password!' }), { status: 401 });
    }

    // Successful login
    return new Response(JSON.stringify({ message: 'Login successful!', username }), { status: 200 });
}
