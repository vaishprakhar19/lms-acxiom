import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username && password) {
            navigate('/user/home');
        } else {
            alert('Please enter valid credentials');
        }
    };

    return (
        <div>
            <h2>User Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default UserLogin;
