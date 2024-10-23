// app/components/FileUpload.jsx
"use client";

import { useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';
import Alert from '../alert';
import FileUploadDisplay from '../file-upload-display';

const FileUpload = ({ username }) => {
    const [files, setFiles] = useState([]);
    const [tags, setTags] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const [showAlert, setShowAlert] = useState(false);

    const onDrop = (acceptedFiles) => {
        setFiles(acceptedFiles);
    };

    const handleUpload = async () => {
        if (files.length === 0) return; // Prevent uploading if no files

        const formData = new FormData();
        formData.append('file', files[0]); // For single file upload
        formData.append('tags', tags);

        const response = await fetch('/netlify/functions/upload', {
            method: 'POST',
            body: JSON.stringify({
                username: 'user1', // Use the current logged-in username here
                file: {
                    name: files[0].name,
                    type: files[0].type,
                },
                tags: tags,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const result = await response.json();
            setUploadedFiles((prev) => [...prev, result.file]); // Update uploaded files
            await fetchUploadedFiles(); // Fetch updated files
            setTags('');
            setFiles([]);
            setShowAlert(true);

        } else {
            const error = await response.json();
            alert(error.error);
        }
    };
    // Fetch uploaded files when the component mounts
    const fetchUploadedFiles = async () => {
        const response = await fetch(`/api/files/${username}`); // Ensure username is correct
        if (response.ok) {
            const result = await response.json();
            setUploadedFiles(result.uploadedFiles); // Set uploaded files
        } else {
            alert('Failed to fetch uploaded files');
        }
    };


    useEffect(() => {
        fetchUploadedFiles();
    }, [username]);

    useEffect(() => {
        // Set a timer to dismiss the alert after 3 seconds
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 2000);

        // Cleanup the timer if the component unmounts or the alert is closed
        return () => clearTimeout(timer);
    }, [showAlert]); // Only run this effect when showAlert changes

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
            'video/*': ['.mp4', '.webm'],
        },
        onDrop,
    });

    const noFilesUploaded = uploadedFiles?.length === 0

    const noFilesSelected = files.length === 0

    return (
        <div className="p-4">{showAlert && (
            <div className='absolute left-4 top-7'>
                <Alert
                    message={"Uploaded successfully!"}
                    type="success"
                    onClose={() => setShowAlert(false)}
                />
            </div>
        )}
            <div {...getRootProps({ className: 'dropzone border-2 border-dashed border-gray-400 p-4 mb-4 text-center' })}>
                <input {...getInputProps()} />
                <p>Drag and drop some files here, or click to select files</p>
            </div>
            <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="border p-2 mb-4 w-full"
            />
            <button
                onClick={handleUpload}
                className={noFilesSelected ? "bg-gray-300 text-white py-2 px-4 rounded " : "bg-blue-500 text-white py-2 px-4 rounded"}
                disabled={noFilesSelected}
            >
                Upload
            </button>
            <h2 className="mt-4 text-lg font-bold text-left mb-2">Uploaded Files</h2>
            <FileUploadDisplay initialFiles={uploadedFiles} noFilesUploaded={noFilesUploaded} />

        </div>
    );
};

export default FileUpload;
