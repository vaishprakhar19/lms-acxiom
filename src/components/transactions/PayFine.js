import React, { useState, useEffect } from 'react';
import { db } from '../firebase';  // Firebase configuration
import { collection, addDoc } from 'firebase/firestore';

const PayFine = () => {
    const [bookName, setBookName] = useState('');
    const [author, setAuthor] = useState('');
    const [serialNo, setSerialNo] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [actualReturnDate, setActualReturnDate] = useState('');
    const [fineCalculated, setFineCalculated] = useState(0);
    const [finePaid, setFinePaid] = useState(false);
    const [remarks, setRemarks] = useState('');

    // Set the default return date to 15 days from today
    useEffect(() => {
        const defaultReturnDate = new Date();
        defaultReturnDate.setDate(defaultReturnDate.getDate() + 15);
        setReturnDate(defaultReturnDate.toISOString().split('T')[0]); // Set it in yyyy-mm-dd format
    }, []);

    // Function to calculate fine based on days overdue
    const calculateFine = () => {
        const issue = new Date(issueDate);
        const returnD = new Date(returnDate);
        const actualReturn = new Date(actualReturnDate);
        
        if (actualReturn > returnD) {
            const overdueDays = Math.floor((actualReturn - returnD) / (1000 * 3600 * 24)); // Calculate overdue days
            setFineCalculated(overdueDays * 5); // Assume a fine rate of ₹5 per overdue day
        } else {
            setFineCalculated(0);
        }
    };

    // Function to handle form submission and store data in Firestore
    const handleSubmit = async () => {
        try {
            // Store fine payment data in Firestore
            await addDoc(collection(db, "finePayments"), {
                bookName: bookName,
                author: author,
                serialNo: serialNo,
                issueDate: issueDate,
                returnDate: returnDate,
                actualReturnDate: actualReturnDate,
                fineCalculated: fineCalculated,
                finePaid: finePaid,
                remarks: remarks,
            });

            alert(`Fine Paid Details:\n\nBook: ${bookName}\nAuthor: ${author}\nSerial No: ${serialNo}\nIssue Date: ${issueDate}\nReturn Date: ${returnDate}\nActual Return Date: ${actualReturnDate}\nFine: ₹${fineCalculated}\nFine Paid: ${finePaid ? 'Yes' : 'No'}\nRemarks: ${remarks}`);
        } catch (error) {
            console.error("Error paying fine: ", error);
            alert("There was an error processing the fine payment. Please try again.");
        }
    };

    // Handle logout by clearing session and redirecting to home
    const handleLogout = () => {
        alert('Logged out!');
        localStorage.removeItem('isAdmin');  // Clear user session
        window.location.href = '/'; // Redirect to homepage
    };

    return (
        <div>
            <h2>Pay Fine</h2>
            <form>
                {/* Book Name (Text Box) */}
                <label>
                    Enter Book Name:
                    <input
                        type="text"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                    />
                </label>
                <br />

                {/* Author (Text Box) */}
                <label>
                    Enter Author:
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </label>
                <br />

                {/* Serial No (Text Box) */}
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

                {/* Issue Date (Calendar) */}
                <label>
                    Issue Date:
                    <input
                        type="date"
                        value={issueDate}
                        onChange={(e) => setIssueDate(e.target.value)}
                    />
                </label>
                <br />

                {/* Return Date (Prepopulated with 15 days ahead) */}
                <label>
                    Return Date:
                    <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                    />
                </label>
                <br />

                {/* Actual Return Date (Calendar) */}
                <label>
                    Actual Return Date:
                    <input
                        type="date"
                        value={actualReturnDate}
                        onChange={(e) => setActualReturnDate(e.target.value)}
                        onBlur={calculateFine}  // Calculate fine when the date is changed
                    />
                </label>
                <br />

                {/* Fine Calculated (Text Box) */}
                <label>
                    Fine Calculated:
                    <input
                        type="text"
                        value={`₹${fineCalculated}`}
                        readOnly
                    />
                </label>
                <br />

                {/* Fine Paid (Checkbox) */}
                <label>
                    Fine Paid:
                    <input
                        type="checkbox"
                        checked={finePaid}
                        onChange={() => setFinePaid(!finePaid)}
                    />
                </label>
                <br />

                {/* Remarks (Text Area, Non-Mandatory) */}
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
                <button type="button" onClick={handleSubmit}>
                    Submit
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

export default PayFine;
