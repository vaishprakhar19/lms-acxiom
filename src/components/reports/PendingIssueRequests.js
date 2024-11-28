import React, { useState, useEffect } from 'react';

const PendingIssueRequests = () => {
    // Sample data for issue requests (replace with actual data from your backend or API)
    const [issueRequests, setIssueRequests] = useState([]);

    useEffect(() => {
        // This is where you would fetch data from an API or database
        // For now, we're using static data for demonstration
        setIssueRequests([
            { membershipId: 'M001', name: 'The Great Gatsby', requestedDate: '2023-01-10', requestFulfilledDate: '2023-01-12' },
            { membershipId: 'M002', name: '1984', requestedDate: '2022-12-15', requestFulfilledDate: '2022-12-17' },
            { membershipId: 'M003', name: 'Inception', requestedDate: '2023-02-01', requestFulfilledDate: '2023-02-03' },
            // Add more issue requests data here...
        ]);
    }, []);

    return (
        <div>
            <h3>Issue Requests</h3>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Membership Id</th>
                        <th>Name of Book/Movie</th>
                        <th>Requested Date</th>
                        <th>Request Fulfilled Date</th>
                    </tr>
                </thead>
                <tbody>
                    {issueRequests.map((request, index) => (
                        <tr key={index}>
                            <td>{request.membershipId}</td>
                            <td>{request.name}</td>
                            <td>{request.requestedDate}</td>
                            <td>{request.requestFulfilledDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PendingIssueRequests;
