"use client";

import { useState } from 'react';
import FileUpload from '../file-upload';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [session, setSession] = useState(null); // Manage session state locally

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            setSession({ user: { username } }); // Update session state
            setMessage(`Welcome, ${username}!`);
        } else {
            setMessage(data.error || 'Login failed: Invalid credentials');
        }
    };

    const handleLogout = async () => {
        setSession(null); // Clear session
        setMessage('Logged out successfully');
    };
    const loggedInUsername = session?.user?.username
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className={session ? "bg-white p-8 rounded-lg shadow-md w-full max-w-3xl" : "bg-white p-8 rounded-lg shadow-md w-96"}>
                {!session && <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>}
                {session ? (
                    <div className="text-center">
                        <p className="mb-4">Welcome, {loggedInUsername}!</p>
                        <FileUpload username={loggedInUsername} />

                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Login
                        </button>
                        {message && <p className="text-red-500 text-center mt-2">{message}</p>}
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginForm;
