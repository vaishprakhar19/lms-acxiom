import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const MasterListOfBooks = () => {

    const [books, setBooks] = useState(() => {
        const storedBooks = localStorage.getItem("books");
        return storedBooks ? JSON.parse(storedBooks) : []; // Default to an empty array
    });

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
                    {books.filter(book => book.type === 'Book').map((book, index) => (
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
