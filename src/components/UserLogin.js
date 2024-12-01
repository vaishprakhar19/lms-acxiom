import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';  // Import Firebase setup
import { collection, query, where, getDocs } from 'firebase/firestore';

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (username && password) {
            // Query Firebase Firestore to check if user exists
            const q = query(collection(db, "users"), where("username", "==", username), where("password", "==", password));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                // Optionally, store user details in localStorage as needed
                const user = querySnapshot.docs[0].data();
                localStorage.setItem('user', JSON.stringify(user));  // Example to store the username
                
                // Redirect user to the user homepage
                navigate('/user/home');
            } else {
                alert('Invalid credentials');
            }
        } else {
            alert('Please enter valid credentials');
        }
    };

    return (
        <div className='form'>
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
