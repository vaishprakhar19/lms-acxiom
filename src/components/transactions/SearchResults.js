import React, { useState, useEffect } from 'react';

const SearchBooks = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [search, setSearch] = useState({
        bookName: '',
        authorName: '',
        serialNumber: '',
    });

    // Sample data (Replace with real data source like Firebase)
    useEffect(() => {
        const fetchBooks = async () => {
            // This should be replaced with your actual data fetching logic
            const sampleBooks = [
                { bookName: 'Book A', authorName: 'Author A', serialNumber: '123', available: true },
                { bookName: 'Book B', authorName: 'Author B', serialNumber: '456', available: false },
                { bookName: 'Book C', authorName: 'Author A', serialNumber: '789', available: true },
                { bookName: 'Book D', authorName: 'Author C', serialNumber: '012', available: false },
            ];
            setBooks(sampleBooks);
            setFilteredBooks(sampleBooks); // Initially show all books
        };

        fetchBooks();
    }, []);

    // Handle Search Filter Input Changes
    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearch((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle Search Logic
    useEffect(() => {
        const { bookName, authorName, serialNumber } = search;
        const filtered = books.filter((book) => {
            return (
                (bookName === '' || book.bookName.toLowerCase().includes(bookName.toLowerCase())) &&
                (authorName === '' || book.authorName.toLowerCase().includes(authorName.toLowerCase())) &&
                (serialNumber === '' || book.serialNumber.includes(serialNumber))
            );
        });
        setFilteredBooks(filtered);
    }, [search, books]);

    return (
        <div>
            <h2>Search Books</h2>
            
            {/* Search Filters */}
            <div>
                <label>
                    Book Name:
                    <input
                        type="text"
                        name="bookName"
                        value={search.bookName}
                        onChange={handleSearchChange}
                        placeholder="Search by book name"
                    />
                </label>
                <br />
                <label>
                    Author Name:
                    <input
                        type="text"
                        name="authorName"
                        value={search.authorName}
                        onChange={handleSearchChange}
                        placeholder="Search by author"
                    />
                </label>
                <br />
                <label>
                    Serial Number:
                    <input
                        type="text"
                        name="serialNumber"
                        value={search.serialNumber}
                        onChange={handleSearchChange}
                        placeholder="Search by serial number"
                    />
                </label>
            </div>

            {/* Results Table */}
            <div style={{ marginTop: '20px' }}>
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Book Name</th>
                            <th>Author Name</th>
                            <th>Serial Number</th>
                            <th>Availability</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((book, index) => (
                                <tr key={index}>
                                    <td>{book.bookName}</td>
                                    <td>{book.authorName}</td>
                                    <td>{book.serialNumber}</td>
                                    <td>{book.available ? 'Available' : 'Not Available'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center' }}>No results found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SearchBooks;
