import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IsBookAvailable = () => {
    const [selectedBookName, setSelectedBookName] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const navigate = useNavigate();
    const [books, setBooks] = useState(() => {
        const storedBooks = localStorage.getItem("books");
        return storedBooks ? JSON.parse(storedBooks) : []; // Default to an empty array
    });

    // Check Availability - Filter books and navigate to search results
    const checkAvailability = () => {
        // Filter books based on selected book name and author
        const filteredBooks = books.filter(
            (book) =>
                (selectedBookName ? book.name === selectedBookName : true) &&
                (selectedAuthor ? book.author === selectedAuthor : true)
        );

        // Navigate to the search-results page and pass filtered data
        navigate('search-results', {
            state: { results: filteredBooks },
        });
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
                        <option value="">Select a book</option>
                        {books.map((book) => (
                            <option key={book.name} value={book.name}>
                                {book.name}
                            </option>
                        ))}
                    </select>
                </label>
                

                <label>
                    Enter Author:
                    <select
                        value={selectedAuthor}
                        onChange={(e) => setSelectedAuthor(e.target.value)}
                    >
                        <option value="">Select an author</option>
                        {books
                            .filter((book) => book.name === selectedBookName) // Only show authors for selected book
                            .map((book) => (
                                <option key={book.author} value={book.author}>
                                    {book.author}
                                </option>
                            ))}
                    </select>
                </label>
                

                <button type="button" onClick={checkAvailability}>
                    Check Availability
                </button>
            </form>
        </div>
    );
};

export default IsBookAvailable;
