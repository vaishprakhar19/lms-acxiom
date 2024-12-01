import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Firebase configuration
import { collection, getDocs, query, where } from 'firebase/firestore';

const IsBookAvailable = () => {
    const [books, setBooks] = useState([]);
    const [selectedBookName, setSelectedBookName] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch books from Firestore
        const fetchBooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'books'));
                const fetchedBooks = querySnapshot.docs.map((doc) => doc.data());
                setBooks(fetchedBooks);
                if (fetchedBooks.length > 0) {
                    setSelectedBookName(fetchedBooks[0].name);
                    setSelectedAuthor(fetchedBooks[0].author);
                }
            } catch (error) {
                console.error('Error fetching books: ', error);
            }
        };

        fetchBooks();
    }, []);

    const checkAvailability = async () => {
        try {
            const booksQuery = query(
                collection(db, 'books'),
                where('name', '==', selectedBookName),
                where('author', '==', selectedAuthor)
            );
            const querySnapshot = await getDocs(booksQuery);

            if (!querySnapshot.empty) {
                // Redirect to a results page if the book is available
                navigate('/transactions/search-results', {
                    state: { available: true, bookName: selectedBookName, author: selectedAuthor },
                });
            } else {
                navigate('/transactions/search-results', {
                    state: { available: false, bookName: selectedBookName, author: selectedAuthor },
                });
            }
        } catch (error) {
            console.error('Error checking book availability: ', error);
        }
    };

    return (
        <div>
            <h2>Check Book Availability</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Enter Book Name:
                    <select
                        value={selectedBookName}
                        onChange={(e) => setSelectedBookName(e.target.value)}
                    >
                        {books.map((book) => (
                            <option key={book.name} value={book.name}>
                                {book.name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />

                <label>
                    Enter Author:
                    <select
                        value={selectedAuthor}
                        onChange={(e) => setSelectedAuthor(e.target.value)}
                    >
                        {books
                            .filter((book) => book.name === selectedBookName)
                            .map((book) => (
                                <option key={book.author} value={book.author}>
                                    {book.author}
                                </option>
                            ))}
                    </select>
                </label>
                <br />

                <button type="button" onClick={checkAvailability}>
                    Check Availability
                </button>
            </form>
        </div>
    );
};

export default IsBookAvailable;
