import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

const ActiveIssues = () => {
    // Sample data for active issues (replace with actual data from your backend or API)
    const [activeIssues, setActiveIssues] = useState([]);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "issues"));
                const issuesList = querySnapshot.docs.map(doc => doc.data());
                setActiveIssues(issuesList);
            } catch (error) {
                console.error("Error fetching issues: ", error);
            }
        };
        fetchIssues();
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
                            <td>{issue.issueDate}</td>
                            <td>{issue.returnDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActiveIssues;
