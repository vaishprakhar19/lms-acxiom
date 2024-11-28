import React, { useState } from 'react';

const ReturnBook = () => {
    const [bookCode, setBookCode] = useState('');

    const returnBook = () => {
        alert(`Book with code ${bookCode} returned successfully.`);
    };

    return (
        <div>
            <h2>Return Book</h2>
            <input
                type="text"
                placeholder="Enter Book Code"
                value={bookCode}
                onChange={(e) => setBookCode(e.target.value)}
            />
            <br />
            <button onClick={returnBook}>Return Book</button>
        </div>
    );
};

export default ReturnBook;
