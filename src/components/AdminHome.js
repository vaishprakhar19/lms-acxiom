import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Import Firebase setup
import { collection, getDocs } from 'firebase/firestore';

const AdminHome = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "books"));
                const booksList = querySnapshot.docs.map(doc => doc.data());
                setBooks(booksList);
                console.log(booksList)
                localStorage.setItem("books",JSON.stringify(booksList));
            } catch (error) {
                console.error("Error fetching books: ", error);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div>
            <h2>Admin Home</h2>
            <table border="1" style={{ width: '50%', borderCollapse: 'collapse', margin: '20px auto' }}>
                <thead>
                    <tr>
                        <th>Serial No</th>
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

export default AdminHome;
