const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../../data.json'); // Adjust path as needed

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    try {
        const { username, file, tags } = JSON.parse(event.body); // Ensure this matches your request body structure
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        const user = data.users.find(user => user.username === username);

        if (!user) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'User not found' }),
            };
        }

        const newFile = {
            name: file.name,
            type: file.type,
            tags: tags,
            uploadedAt: new Date().toISOString(),
            shareableLink: `https://herogram-next-fullstack-ghazanfar.netlify.app/files/${username}/${file.name}`,
        };

        user.uploadedFiles.push(newFile);
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify({ file: newFile }),
        };
    } catch (error) {
        console.error("Upload Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error', details: error.message }), // Include error message for debugging
        };
    }
};
