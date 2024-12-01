import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Import Firebase setup
import { collection, getDocs } from 'firebase/firestore';

const UserHome = () => {
    const [books, setbooks] = useState([]);

    useEffect(() => {
        const fetchbooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'books')); // Adjust the collection name as per your Firestore setup
                const bookList = querySnapshot.docs.map(doc => doc.data());
                setbooks(bookList);
            } catch (error) {
                console.error("Error fetching books: ", error);
            }
        };

        fetchbooks();
    }, []);

    return (
        <div>
            <h2>User Home</h2>
            <table border="1" style={{ width: '50%', borderCollapse: 'collapse', margin: '20px auto' }}>
                <thead>
                    <tr>
                        <th>Code From</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={index}>
                            <td>{book.serialNo}</td>
                            <td>{book.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserHome;
