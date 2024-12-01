import React, { useState, useEffect } from 'react';
import { db } from '../firebase';  // Firebase configuration
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

const PayFine = () => {
    const [name, setBookName] = useState('');
    const [author, setAuthor] = useState('');
    const [serialNo, setSerialNo] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [actualReturnDate, setActualReturnDate] = useState('');
    const [fine, setFine] = useState(0);
    const [finePaid, setFinePaid] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [books, setBooks] = useState([]);  // Store books from Firestore

    // Fetch the books from `returnedBooks` collection to populate the dropdown
    useEffect(() => {
        const fetchReturnedBooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'returnedBooks'));
                const booksData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setBooks(booksData);
            } catch (error) {
                console.error('Error fetching books: ', error);
            }
        };

        fetchReturnedBooks();
    }, []);

    // Set the default return date to 15 days from today
    useEffect(() => {
        const defaultReturnDate = new Date();
        defaultReturnDate.setDate(defaultReturnDate.getDate() + 15);
        setReturnDate(defaultReturnDate.toISOString().split('T')[0]); // Set it in yyyy-mm-dd format
    }, []);

    // Handle book selection from dropdown and populate fields
    const handleBookSelect = (selectedBook) => {
        setBookName(selectedBook.name);
        setAuthor(selectedBook.author);
        setSerialNo(selectedBook.serialNo);
        setIssueDate(selectedBook.issueDate);
        setReturnDate(selectedBook.returnDate);
        setActualReturnDate(selectedBook.actualReturnDate || '');
        setFine(selectedBook.fine || 0);
        setFinePaid(selectedBook.finePaid || false);
        setRemarks(selectedBook.remarks || '');
    };

    // Function to handle form submission and store data in Firestore
    const handleSubmit = async () => {
        try {
            // Find the selected book's document reference using its ID
            const bookQuery = query(
                collection(db, "returnedBooks"),
                where("serialNo", "==", serialNo)
            );

            const querySnapshot = await getDocs(bookQuery);
            const bookDocRef = querySnapshot.docs[0].ref;

            // Update the `finePaid` field and any other necessary fields
            await updateDoc(bookDocRef, {
                finePaid: finePaid,  // Update the `finePaid` field based on checkbox
                remarks: remarks,    // Update the remarks if any
            });

            alert(`Fine Paid Details:\n\nBook: ${name}\nAuthor: ${author}\nSerial No: ${serialNo}\nIssue Date: ${issueDate}\nReturn Date: ${returnDate}\nActual Return Date: ${actualReturnDate}\nFine: ₹${fine}\nFine Paid: ${finePaid ? 'Yes' : 'No'}\nRemarks: ${remarks}`);
        } catch (error) {
            console.error("Error paying fine: ", error);
            alert("There was an error processing the fine payment. Please try again.");
        }
    };



    return (
        <div>
            <h2>Pay Fine</h2>
            <form>
                {/* Book Name Dropdown */}
                <label>
                    Select Book:
                    <select
                        value={name}
                        onChange={(e) => {
                            const selectedBook = books.find(book => book.name === e.target.value);
                            handleBookSelect(selectedBook);
                        }}
                    >
                        <option value="">Select a book</option>
                        {books.map((book) => (
                            <option key={book.id} value={book.name}>
                                {book.name} - {book.author}
                            </option>
                        ))}
                    </select>
                </label>
                

                {/* Author (Auto-populated) */}
                <label>
                    Author:
                    <input
                        type="text"
                        value={author}
                        readOnly
                    />
                </label>
                

                {/* Serial No (Auto-populated) */}
                <label>
                    Serial No:
                    <input
                        type="text"
                        value={serialNo}
                        readOnly
                    />
                </label>
                

                {/* Issue Date (Auto-populated) */}
                <label>
                    Issue Date:
                    <input
                        type="date"
                        value={issueDate}
                        readOnly
                    />
                </label>
                

                {/* Return Date (Auto-populated) */}
                <label>
                    Return Date:
                    <input
                        type="date"
                        value={returnDate}
                        readOnly
                    />
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
                

                {/* Fine Calculated (Read-Only) */}
                <label>
                    Fine Calculated:
                    <input
                        type="text"
                        value={`₹${fine}`}
                        readOnly
                    />
                </label>
                

                {/* Fine Paid (Checkbox) */}
                <label>
                    Fine Paid:
                    <input
                        type="checkbox"
                        checked={finePaid}
                        onChange={() => setFinePaid(!finePaid)}
                    />
                </label>
                

                {/* Remarks (Text Area, Non-Mandatory) */}
                <label>
                    Remarks:
                    <textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Optional"
                    ></textarea>
                </label>
                

                {/* Submit Button */}
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
                
                
            </form>
        </div>
    );
};


export default PayFine;
