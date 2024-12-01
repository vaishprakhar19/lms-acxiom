import React, { useState } from "react";
import { db } from "../firebase"; // Import Firebase setup
import { collection, doc, setDoc, getDoc, updateDoc, query, where, getDocs } from "firebase/firestore";

const UserManagement = () => {
    const [formData, setFormData] = useState({
        userType: "New", // Default to New User
        membershipId: "", // Used for Existing User
        name: "",
        status: false, // Default to inactive
        isAdmin: false, // Default to non-admin
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const generateMembershipId = async () => {
        const counterDocRef = doc(db, "counters", "membershipCounter");
        const counterDoc = await getDoc(counterDocRef);

        if (!counterDoc.exists()) {
            // Initialize the counter if it doesn't exist
            await setDoc(counterDocRef, { lastMembershipId: 0 });
            return "M001";
        }

        const lastId = counterDoc.data().lastMembershipId;
        const nextId = lastId + 1;

        // Update the counter in Firestore
        await updateDoc(counterDocRef, { lastMembershipId: nextId });

        // Format the membership ID as M01, M02, etc.
        return `M${String(nextId).padStart(3, "0")}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            if (formData.userType === "New") {
                // Generate a new membership ID
                const membershipId = await generateMembershipId();
    
                // Add a new user to Firestore
                const newUserRef = doc(collection(db, "users"));
                await setDoc(newUserRef, {
                    membershipId, // Save the generated membership ID
                    username: formData.name,
                    active: formData.status,
                    isAdmin: formData.isAdmin,
                    password: formData.password,
                });
                alert(`New user added successfully with Membership ID: ${membershipId}`);
            } else if (formData.userType === "Existing") {
                // Query Firestore for the existing user
                const userQuery = query(collection(db, "users"), where("membershipId", "==", formData.membershipId));
                const querySnapshot = await getDocs(userQuery);
    
                if (querySnapshot.empty) {
                    // Handle the case where no user is found
                    alert("User not found!");
                    return;
                }
    
                // Update the first document matching the query
                const userDoc = querySnapshot.docs[0];
                const userRef = userDoc.ref;
    
                await updateDoc(userRef, {
                    username: formData.name,
                    active: formData.status,
                    isAdmin: formData.isAdmin,
                    password: formData.password,
                });
    
                alert("User updated successfully!");
            }
            // Reset form after submission
            setFormData({
                userType: "New",
                membershipId: "",
                name: "",
                password: "",
                status: false,
                isAdmin: false,
            });
        } catch (error) {
            console.error("Error managing user: ", error);
            alert("Error processing the user management request.");
        }
    };
    
    return (
        <div className="user-management-container">
            <h2>User Management</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    User Type:
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="userType"
                            value="New"
                            checked={formData.userType === "New"}
                            onChange={handleChange}
                        />
                        New User
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="userType"
                            value="Existing"
                            checked={formData.userType === "Existing"}
                            onChange={handleChange}
                        />
                        Existing User
                    </label>
                </label>
                <br />

                {formData.userType === "Existing" && (
                    <label>
                        User ID:
                        <input
                            type="text"
                            name="membershipId"
                            value={formData.membershipId}
                            onChange={handleChange}
                            required
                        />
                    </label>
                )}
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
                    Password:
                    <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Status:
                    <input
                        type="checkbox"
                        name="status"
                        checked={formData.status}
                        onChange={handleChange}
                    />
                    Active
                </label>
                <br />

                <label>
                    Admin:
                    <input
                        type="checkbox"
                        name="isAdmin"
                        checked={formData.isAdmin}
                        onChange={handleChange}
                    />
                    Admin
                </label>
                <br />

                <button type="submit">
                    {formData.userType === "New" ? "Add User" : "Update User"}
                </button>
            </form>
        </div>
    );
};

export default UserManagement;
