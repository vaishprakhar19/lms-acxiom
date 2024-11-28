import React, { useState } from 'react';

const IsBookAvailable = () => {
    const [bookCode, setBookCode] = useState('');
    const [availability, setAvailability] = useState(null);

    const checkAvailability = () => {
        // Simulating book availability check
        if (bookCode === '123') {
            setAvailability(true);
        } else {
            setAvailability(false);
        }
    };

    return (
        <div>
            <h2>Check Book Availability</h2>
            <input
                type="text"
                placeholder="Enter Book Code"
                value={bookCode}
                onChange={(e) => setBookCode(e.target.value)}
            />
            <button onClick={checkAvailability}>Check</button>
            {availability !== null && (
                <p>{availability ? 'Book is available.' : 'Book is not available.'}</p>
            )}
        </div>
    );
};

export default IsBookAvailable;
