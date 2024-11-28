import React, { useState } from 'react';

const PayFine = () => {
    const [userId, setUserId] = useState('');
    const [amount, setAmount] = useState('');

    const payFine = () => {
        alert(`Fine of $${amount} paid by User ID ${userId}`);
    };

    return (
        <div>
            <h2>Pay Fine</h2>
            <input
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <br />
            <input
                type="text"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <br />
            <button onClick={payFine}>Pay Fine</button>
        </div>
    );
};

export default PayFine;
