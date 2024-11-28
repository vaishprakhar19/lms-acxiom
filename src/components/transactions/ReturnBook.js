import React, { useState, useEffect } from 'react';
import { db } from '../firebase';  // Firebase configuration
import { collection, addDoc } from 'firebase/firestore';

const ReturnBook = () => {
    const books = [
        { name: 'Book A', author: 'Author A', serialNo: '123' },
        { name: 'Book B', author: 'Author B', serialNo: '456' },
        { name: 'Book C', author: 'Author C', serialNo: '789' },
    ];

    const [selectedBook, setSelectedBook] = useState(books[0]);
    const [serialNo, setSerialNo] = useState(books[0].serialNo);
    const [issueDate, setIssueDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [actualReturnDate, setActualReturnDate] = useState('');
    const [remarks, setRemarks] = useState('');

    // Set the default return date to 15 days from today
    useEffect(() => {
        const defaultReturnDate = new Date();
        defaultReturnDate.setDate(defaultReturnDate.getDate() + 15);
        setReturnDate(defaultReturnDate.toISOString().split('T')[0]); // Set it in yyyy-mm-dd format
    }, []);

    const handleReturnBook = async () => {
        // Ensure the actual return date is not earlier than the issue date or return date
        if (new Date(actualReturnDate) < new Date(issueDate)) {
            alert("Actual Return Date cannot be earlier than Issue Date!");
            return;
        }
        if (new Date(actualReturnDate) < new Date(returnDate)) {
            alert("Actual Return Date cannot be earlier than Return Date!");
            return;
        }

        try {
            // Store returned book details in Firebase
            await addDoc(collection(db, "returnedBooks"), {
                bookName: selectedBook.name,
                author: selectedBook.author,
                serialNo: serialNo,
                issueDate: issueDate,
                returnDate: returnDate,
                actualReturnDate: actualReturnDate,
                remarks: remarks,
            });

            alert(`Book returned successfully!\n\nBook: ${selectedBook.name}\nSerial No: ${serialNo}\nIssue Date: ${issueDate}\nReturn Date: ${returnDate}\nActual Return Date: ${actualReturnDate}\nRemarks: ${remarks}`);
        } catch (error) {
            console.error("Error returning book: ", error);
            alert("There was an error processing the return. Please try again.");
        }
    };

    const handleLogout = () => {
        alert('Logged out!');
        localStorage.removeItem('isAdmin');  // Clear user session
        window.location.href = '/'; // Redirect to homepage
    };

    return (
        <div>
            <h2>Return Book</h2>
            <form>
                {/* Book Name Dropdown */}
                <label>
                    Enter Book Name:
                    <select
                        value={selectedBook.name}
                        onChange={(e) => {
                            const book = books.find((b) => b.name === e.target.value);
                            setSelectedBook(book);
                            setSerialNo(book.serialNo); // Set serialNo to the selected book
                        }}
                    >
                        {books.map((book) => (
                            <option key={book.name} value={book.name}>
                                {book.name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />

                {/* Author (Non-editable) */}
                <label>
                    Enter Author:
                    <textarea value={selectedBook.author} readOnly />
                </label>
                <br />

                {/* Serial No (Mandatory) */}
                <label>
                    Serial No:
                    <input
                        type="text"
                        value={serialNo}
                        onChange={(e) => setSerialNo(e.target.value)}
                        required
                    />
                </label>
                <br />

                {/* Issue Date */}
                <label>
                    Issue Date:
                    <input
                        type="date"
                        value={issueDate}
                        onChange={(e) => setIssueDate(e.target.value)}
                    />
                </label>
                <br />

                {/* Return Date (Prepopulated) */}
                <label>
                    Return Date:
                    <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                    />
                </label>
                <br />

                {/* Actual Return Date */}
                <label>
                    Actual Return Date:
                    <input
                        type="date"
                        value={actualReturnDate}
                        onChange={(e) => setActualReturnDate(e.target.value)}
                    />
                </label>
                <br />

                {/* Remarks (Optional) */}
                <label>
                    Remarks:
                    <textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Optional"
                    ></textarea>
                </label>
                <br />

                {/* Submit Button */}
                <button type="button" onClick={handleReturnBook}>
                    Return Book
                </button>
                <br />
                <br />

                {/* Logout Button */}
                <button type="button" onClick={handleLogout}>
                    Log Out
                </button>
            </form>
        </div>
    );
};

export default ReturnBook;
