import React, { useState } from 'react';
import { db } from '../firebase';  // Import Firebase setup
import { collection, addDoc } from 'firebase/firestore';

const IssueBook = () => {
    const [books, setBooks] = useState(() => {
        const storedBooks = localStorage.getItem("books");
        return storedBooks ? JSON.parse(storedBooks) : []; // Default to an empty array
    });
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : {}; // Default to an empty object
    });
    const [selectedBook, setSelectedBook] = useState(books[0]);
    const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]); // Today's date
    const [returnDate, setReturnDate] = useState(() => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 15);
        return futureDate.toISOString().split('T')[0]; // 15 days ahead
    });
    const [remarks, setRemarks] = useState('');

    // Firebase function to store the issued book details
    const handleIssueBook = async () => {
        try {
            await addDoc(collection(db, "issues"), {
                serialNo: selectedBook.serialNo,
                membershipId: user.membershipId,
                name: selectedBook.name,
                author: selectedBook.author,
                issueDate: issueDate,
                returnDate: returnDate,
                remarks: remarks,
            });

            alert(`Book issued successfully!\n\nBook: ${selectedBook.name}\nAuthor: ${selectedBook.author}\nIssue Date: ${issueDate}\nReturn Date: ${returnDate}\nRemarks: ${remarks}`);
        } catch (error) {
            console.error("Error issuing book: ", error);
            alert("There was an error issuing the book. Please try again.");
        }
    };

    // Logout function to clear user session and redirect
    const handleLogout = () => {
        alert('Logged out!');
        localStorage.removeItem('isAdmin');  // Clear user session
        window.location.href = '/'; // Redirect to the homepage
    };

    return (
        <div>
            <h2>Issue Book</h2>
            <form>
                {/* Book Name Dropdown */}
                <label>
                    Enter Book Name:
                    <select
                        value={selectedBook.name}
                        onChange={(e) => {
                            const book = books.find((b) => b.name === e.target.value);
                            setSelectedBook(book);
                        }}
                    >
                        {books.map((book) => (
                            <option key={book.name} value={book.name}>
                                {book.name}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Author (Prepopulated, Non-editable) */}
                <label>
                    Enter Author:
                    <input type="text" value={selectedBook.author} readOnly />
                </label>

                {/* Issue Date */}
                <label>
                    Issue Date:
                    <input
                        type="date"
                        value={issueDate}
                        onChange={(e) => setIssueDate(e.target.value)}
                    />
                </label>

                {/* Return Date (Prepopulated) */}
                <label>
                    Return Date:
                    <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
                </label>

                {/* Remarks */}
                <label>
                    Remarks:
                    <textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Optional"
                    ></textarea>
                </label>

                {/* Issue Button */}
                <button type="button" onClick={handleIssueBook}>
                    Issue Book
                </button>

            </form>
        </div>
    );
};

export default IssueBook;
