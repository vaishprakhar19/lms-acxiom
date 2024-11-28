import React, { useState } from 'react';
import { db } from '../firebase'; // Import Firebase methods
import { collection, addDoc } from 'firebase/firestore';

const MembershipAdd = () => {
    const [formData, setFormData] = useState({
        membershipId: '',
        name: '',
        contactNumber: '',
        contactAddress: '',
        aadharCardNo: '',
        startDate: '',
        endDate: '',
        status: 'Active', // Default status
        amountPending: 0, // Default amount pending
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add form data to Firebase Firestore
            await addDoc(collection(db, 'memberships'), formData);
            alert('Membership added successfully!');
            // Reset form after submission
            setFormData({
                membershipId: '',
                name: '',
                contactNumber: '',
                contactAddress: '',
                aadharCardNo: '',
                startDate: '',
                endDate: '',
                status: 'Active',
                amountPending: 0,
            });
        } catch (error) {
            console.error('Error adding membership: ', error);
        }
    };

    return (
        <div className="membership-add-container">
            <h2>Add Membership</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Membership ID:
                    <input
                        type="text"
                        name="membershipId"
                        value={formData.membershipId}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Contact Number:
                    <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Contact Address:
                    <input
                        type="text"
                        name="contactAddress"
                        value={formData.contactAddress}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Aadhar Card No:
                    <input
                        type="text"
                        name="aadharCardNo"
                        value={formData.aadharCardNo}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Start Date:
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    End Date:
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Status:
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                    </select>
                </label>
                <br />

                <label>
                    Amount Pending:
                    <input
                        type="number"
                        name="amountPending"
                        value={formData.amountPending}
                        onChange={handleChange}
                        min="0"
                    />
                </label>
                <br />

                <button type="submit">Add Membership</button>
            </form>
        </div>
    );
};

export default MembershipAdd;
