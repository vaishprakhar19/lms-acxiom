import React, { useState, useEffect } from 'react';

const ActiveIssues = () => {
    // Sample data for active issues (replace with actual data from your backend or API)
    const [activeIssues, setActiveIssues] = useState([]);

    useEffect(() => {
        // This is where you would fetch data from an API or database
        // For now, we're using static data for demonstration
        setActiveIssues([
            { serialNo: 'ISS001', name: 'The Great Gatsby', membershipId: 'M001', dateOfIssue: '2023-01-10', dateOfReturn: '2023-01-25' },
            { serialNo: 'ISS002', name: '1984', membershipId: 'M002', dateOfIssue: '2022-12-15', dateOfReturn: '2023-01-15' },
            { serialNo: 'ISS003', name: 'Inception', membershipId: 'M003', dateOfIssue: '2023-02-01', dateOfReturn: '2023-02-16' },
            // Add more issue data here...
        ]);
    }, []);

    return (
        <div>
            <h3>Active Issues</h3>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Serial No Book/Movie</th>
                        <th>Name of Book/Movie</th>
                        <th>Membership Id</th>
                        <th>Date of Issue</th>
                        <th>Date of Return</th>
                    </tr>
                </thead>
                <tbody>
                    {activeIssues.map((issue, index) => (
                        <tr key={index}>
                            <td>{issue.serialNo}</td>
                            <td>{issue.name}</td>
                            <td>{issue.membershipId}</td>
                            <td>{issue.dateOfIssue}</td>
                            <td>{issue.dateOfReturn}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActiveIssues;
