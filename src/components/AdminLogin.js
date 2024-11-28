import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';  // Import Firebase setup
import { collection, query, where, getDocs } from 'firebase/firestore';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (username && password) {
            // Query Firebase Firestore to check if user exists with matching username and password
            const q = query(collection(db, "users"), where("username", "==", username), where("password", "==", password));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                // Check if the user is an admin
                const user = querySnapshot.docs[0].data(); // Get the first matching user
                if (user.isAdmin) {
                    // Set isAdmin in localStorage if user is an admin
                    localStorage.setItem('isAdmin', 'true');
                    navigate('/admin/home');
                } else {
                    alert('You do not have admin privileges.');
                }
            } else {
                alert('Invalid credentials');
            }
        } else {
            alert('Please enter valid credentials');
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
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

export default AdminLogin;
