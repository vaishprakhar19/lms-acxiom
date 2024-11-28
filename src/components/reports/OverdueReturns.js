import React, { useState, useEffect } from 'react';

const OverdueReturns = () => {
    // Sample data for overdue returns (replace with actual data from your backend or API)
    const [overdueReturns, setOverdueReturns] = useState([]);

    // Fine rate per day (this can be adjusted as per the library's policy)
    const fineRatePerDay = 5;

    useEffect(() => {
        // This is where you would fetch data from an API or database
        // For now, we're using static data for demonstration
        setOverdueReturns([
            { serialNo: 'B001', name: 'The Great Gatsby', membershipId: 'M001', dateOfIssue: '2023-01-10', dateOfReturn: '2023-01-25', actualReturnDate: '2023-02-05' },
            { serialNo: 'B002', name: '1984', membershipId: 'M002', dateOfIssue: '2022-12-15', dateOfReturn: '2023-01-15', actualReturnDate: '2023-01-20' },
            { serialNo: 'B003', name: 'Inception', membershipId: 'M003', dateOfIssue: '2023-02-01', dateOfReturn: '2023-02-16', actualReturnDate: '2023-02-18' },
            // Add more overdue returns data here...
        ]);
    }, []);

    // Function to calculate the fine for overdue returns
    const calculateFine = (actualReturnDate, dateOfReturn) => {
        // Convert the dates to JavaScript Date objects
        const returnDate = new Date(dateOfReturn);
        const actualReturn = new Date(actualReturnDate);

        // If the actual return date is later than the expected return date, calculate the fine
        if (actualReturn > returnDate) {
            const overdueDays = Math.ceil((actualReturn - returnDate) / (1000 * 3600 * 24)); // Calculate days overdue
            return overdueDays * fineRatePerDay; // Return the fine amount
        }
        return 0; // No fine if the book is returned on or before the due date
    };

    return (
        <div>
            <h3>Overdue Returns</h3>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Serial No Book</th>
                        <th>Name of Book</th>
                        <th>Membership Id</th>
                        <th>Date of Issue</th>
                        <th>Date of Return</th>
                        <th>Fine Calculations</th>
                    </tr>
                </thead>
                <tbody>
                    {overdueReturns.map((returnItem, index) => {
                        const fine = calculateFine(returnItem.actualReturnDate, returnItem.dateOfReturn);
                        return (
                            <tr key={index}>
                                <td>{returnItem.serialNo}</td>
                                <td>{returnItem.name}</td>
                                <td>{returnItem.membershipId}</td>
                                <td>{returnItem.dateOfIssue}</td>
                                <td>{returnItem.actualReturnDate}</td>
                                <td>₹{fine}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default OverdueReturns;
