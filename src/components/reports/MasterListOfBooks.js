import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const MasterListOfBooks = () => {
    // Sample data for the books (replace with actual data from your backend or API)
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch books data from Firestore
        const fetchBooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'books'));
                const booksArray = [];
                querySnapshot.forEach((doc) => {
                    booksArray.push(doc.data());
                });
                setBooks(booksArray);
            } catch (error) {
                console.error("Error fetching books: ", error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h3>Master List of Books</h3>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Serial No</th>
                        <th>Name of Book</th>
                        <th>Author Name</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Cost</th>
                        <th>Procurement Date</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={index}>
                            <td>{book.serialNo}</td>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>{book.category}</td>
                            <td>{book.status}</td>
                            <td>{book.cost}</td>
                            <td>{book.procurementDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MasterListOfBooks;
