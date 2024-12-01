import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

const OverdueReturns = () => {
    // Sample data for overdue returns (replace with actual data from your backend or API)
    const [overdueReturns, setOverdueReturns] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "returnedBooks"));
                const returnedBooksList = querySnapshot.docs.map(doc => doc.data());
                const paidBooks = returnedBooksList.filter(book => book.finePaid !== true);
                setOverdueReturns(paidBooks);
                console.log(overdueReturns);
            } catch (error) {
                console.error("Error fetching overdues: ", error);
            }
        };
        fetchBooks();
    }, []);




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
                        return (
                            <tr key={index}>
                                <td>{returnItem.serialNo}</td>
                                <td>{returnItem.name}</td>
                                <td>{returnItem.membershipId}</td>
                                <td>{returnItem.issueDate}</td>
                                <td>{returnItem.actualReturnDate}</td>
                                <td>₹{returnItem.fine}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default OverdueReturns;
