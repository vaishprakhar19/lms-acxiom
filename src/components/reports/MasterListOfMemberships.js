import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const MasterListOfMemberships = () => {
    // Sample data for active memberships (replace with actual data from your backend or API)
    const [memberships, setMemberships] = useState([]);

    useEffect(() => {
        // Fetch data from Firestore
        const fetchMemberships = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'memberships'));
                const membershipsArray = [];
                querySnapshot.forEach((doc) => {
                    membershipsArray.push(doc.data());
                });
                setMemberships(membershipsArray);
            } catch (error) {
                console.error("Error fetching memberships: ", error);
            }
        };

        fetchMemberships();
    }, []);


    return (
        <div>
            <h3>List of Active Memberships</h3>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Membership Id</th>
                        <th>Name of Member</th>
                        <th>Contact Number</th>
                        <th>Contact Address</th>
                        <th>Aadhar Card No</th>
                        <th>Start Date of Membership</th>
                        <th>End Date of Membership</th>
                        <th>Status</th>
                        <th>Amount Pending (Fine)</th>
                    </tr>
                </thead>
                <tbody>
                    {memberships.map((membership, index) => (
                        <tr key={index}>
                            <td>{membership.membershipId}</td>
                            <td>{membership.name}</td>
                            <td>{membership.contactNumber}</td>
                            <td>{membership.contactAddress}</td>
                            <td>{membership.aadharCardNo}</td>
                            <td>{membership.startDate}</td>
                            <td>{membership.endDate}</td>
                            <td>{membership.status}</td>
                            <td>{membership.amountPending}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MasterListOfMemberships;
