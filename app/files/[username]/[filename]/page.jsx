// app/files/[username]/[filename]/page.jsx
"use client"

import { useEffect, useState } from 'react';

const FileDetails = ({ params }) => {
    const { username, filename } = params;
    const [fileDetails, setFileDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // const fetchFileDetails = async () => {
        //     const response = await fetch(`/api/files/${username}/${filename}`);
        //     if (response.ok) {
        //         const data = await response.json();
        //         setFileDetails(data);
        //     } else {
        //         setError('File not found');
        //     }
        // };

        const fetchUploadedFiles = async () => {
            const response = await fetch(`/api/files/${username}`); // Ensure username is correct
            if (response.ok) {
                const result = await response.json();
                setFileDetails(result.uploadedFiles?.find(file => file?.name === filename)); // Set uploaded file

            } else {
                alert('Failed to fetch uploaded files');
            }
        };

        fetchUploadedFiles();
    }, [username, filename]);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!fileDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">{fileDetails.name}</h1>
            <p><strong>Type:</strong> {fileDetails.type}</p>
            <p><strong>Tags:</strong> {fileDetails.tags}</p>
            <p><strong>Uploaded At:</strong> {new Date(fileDetails.uploadedAt).toLocaleString()}</p>
            <a href={`/api/files/${username}/${filename}`} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                Download File
            </a>
        </div>
    );
};

export default FileDetails;
