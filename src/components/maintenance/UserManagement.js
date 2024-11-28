import React, { useState } from "react";
import { db } from "../firebase"; // Import Firebase setup
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const UserManagement = () => {
    const [formData, setFormData] = useState({
        userType: "New", // Default to New User
        userId: "", // Used for Existing User
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (formData.userType === "New") {
                // Add a new user to Firestore
                const newUserRef = doc(collection(db, "users"));
                await setDoc(newUserRef, {
                    name: formData.name,
                    status: formData.status,
                    isAdmin: formData.isAdmin,
                });
                alert("New user added successfully!");
            } else if (formData.userType === "Existing") {
                // Update an existing user in Firestore
                const existingUserRef = doc(db, "users", formData.userId);
                const userDoc = await getDoc(existingUserRef);

                if (!userDoc.exists()) {
                    alert("User not found!");
                } else {
                    await updateDoc(existingUserRef, {
                        name: formData.name,
                        status: formData.status,
                        isAdmin: formData.isAdmin,
                    });
                    alert("User updated successfully!");
                }
            }

            // Reset form after submission
            setFormData({
                userType: "New",
                userId: "",
                name: "",
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
                            name="userId"
                            value={formData.userId}
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
