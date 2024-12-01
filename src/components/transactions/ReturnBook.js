import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Firebase configuration
import { collection, doc, getDocs, deleteDoc, addDoc } from 'firebase/firestore';

const ReturnBook = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [serialNo, setSerialNo] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [actualReturnDate, setActualReturnDate] = useState('');
    const [remarks, setRemarks] = useState('');
    const [fine, setFine] = useState(0); // Fine calculation

    // Fetch issued books from the `issues` collection
    useEffect(() => {
        const fetchIssuedBooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'issues'));
                const issuedBooks = querySnapshot.docs.map((doc) => ({
                    id: doc.id, // Firestore document ID
                    ...doc.data(), // Book data
                }));
                setBooks(issuedBooks);
                if (issuedBooks.length > 0) {
                    setSelectedBook(issuedBooks[0]); // Set the first book as default
                    setSerialNo(issuedBooks[0].serialNo);
                    setIssueDate(issuedBooks[0].issueDate);
                }
            } catch (error) {
                console.error('Error fetching issued books: ', error);
                alert('Error fetching issued books. Please try again.');
            }
        };

        fetchIssuedBooks();
    }, []);

    // Set the default return date to 15 days from the issue date
    useEffect(() => {
        if (issueDate) {
            const defaultReturnDate = new Date(issueDate);
            defaultReturnDate.setDate(defaultReturnDate.getDate() + 15);
            setReturnDate(defaultReturnDate.toISOString().split('T')[0]);
        }
    }, [issueDate]);

    // Calculate fine if dates differ
    useEffect(() => {
        if (actualReturnDate && returnDate) {
            const returnDateObj = new Date(returnDate);
            const actualReturnDateObj = new Date(actualReturnDate);

            // If the actual return date is after the expected return date, calculate fine
            if (actualReturnDateObj > returnDateObj) {
                const timeDifference = actualReturnDateObj - returnDateObj;
                const daysLate = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
                setFine(daysLate * 5); // 5 rupees per day
            } else {
                setFine(0); // No fine if returned on time
            }
        }
    }, [actualReturnDate, returnDate]);

    const handleReturnBook = async () => {
        // Ensure the actual return date is valid
        if (!actualReturnDate) {
            alert("Please enter the actual return date.");
            return;
        }
        if (new Date(actualReturnDate) < new Date(issueDate)) {
            alert("Actual Return Date cannot be earlier than Issue Date!");
            return;
        }

        try {
            // Add the returned book details to the `returnedBooks` collection
            await addDoc(collection(db, 'returnedBooks'), {
                name: selectedBook.name,
                author: selectedBook.author,
                serialNo: serialNo,
                issueDate: issueDate,
                returnDate: returnDate,
                actualReturnDate: actualReturnDate,
                remarks: remarks,
                fine: fine, // Store calculated fine
                finePaid: fine === 0 ? true : false, // Set paid to true if fine is 0, else false
            });

            // Remove the book entry from the `issues` collection
            const issueDocRef = doc(db, 'issues', selectedBook.id);
            await deleteDoc(issueDocRef);

            alert(`Book returned successfully!\n\nBook: ${selectedBook.name}\nSerial No: ${serialNo}\nIssue Date: ${issueDate}\nReturn Date: ${returnDate}\nActual Return Date: ${actualReturnDate}\nRemarks: ${remarks}\nFine: ₹${fine}`);
        } catch (error) {
            console.error('Error returning book: ', error);
            alert('Error processing the return. Please try again.');
        }
    };

    return (
        <div>
            <h2>Return Book</h2>
            <form>
                {/* Book Name Dropdown */}
                <label>
                    Select Book Name:
                    <select
                        value={selectedBook?.name || ''}
                        onChange={(e) => {
                            const book = books.find((b) => b.name === e.target.value);
                            setSelectedBook(book);
                            setSerialNo(book.serialNo);
                            setIssueDate(book.issueDate);
                        }}
                    >
                        {books.map((book) => (
                            <option key={book.id} value={book.name}>
                                {book.name}
                            </option>
                        ))}
                    </select>
                </label>


                {/* Author (Non-editable) */}
                <label>
                    Author:
                    <textarea value={selectedBook?.author || ''} readOnly />
                </label>


                {/* Serial No (Non-editable) */}
                <label>
                    Serial No:
                    <input type="text" value={serialNo} readOnly />
                </label>


                {/* Issue Date (Non-editable) */}
                <label>
                    Issue Date:
                    <input type="date" value={issueDate} readOnly />
                </label>


                {/* Return Date (Non-editable) */}
                <label>
                    Return Date:
                    <input type="date" value={returnDate} readOnly />
                </label>


                {/* Actual Return Date */}
                <label>
                    Actual Return Date:
                    <input
                        type="date"
                        value={actualReturnDate}
                        onChange={(e) => setActualReturnDate(e.target.value)}
                    />
                </label>


                {/* Remarks (Optional) */}
                <label>
                    Remarks:
                    <textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Optional"
                    ></textarea>
                </label>


                {/* Submit Button */}
                <button type="button" onClick={handleReturnBook}>
                    Return Book
                </button>


            </form>
        </div>
    );
};

export default ReturnBook;
