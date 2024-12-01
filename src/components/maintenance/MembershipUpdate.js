import React, { useState } from "react";
import { db } from "../firebase"; // Import Firebase setup
import { collection, query, where, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

const MembershipUpdate = () => {
    const [formData, setFormData] = useState({
        membershipId: "",
        startDate: "",
        endDate: "",
        membershipExtn: "6 Months", // Default to 6 months
        removeMembership: false, // Default to no removal
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
            const membershipsCollection = collection(db, "memberships");
            const membershipQuery = query(
                membershipsCollection,
                where("membershipId", "==", formData.membershipId)
            );
            const querySnapshot = await getDocs(membershipQuery);

            if (querySnapshot.empty) {
                alert("No membership found with the provided membership number.");
                return;
            }

            // Assume there's only one matching document
            const membershipDoc = querySnapshot.docs[0];
            const membershipRef = membershipDoc.ref;

            if (formData.removeMembership) {
                // If "Remove Membership" is selected, delete the document
                await deleteDoc(membershipRef);
                alert("Membership removed successfully!");
            } else {
                // Update the membership details
                await updateDoc(membershipRef, {
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    membershipExtn: formData.membershipExtn,
                });
                alert("Membership updated successfully!");
            }

            // Optionally reset form after submission
            setFormData({
                membershipId: "",
                startDate: "",
                endDate: "",
                membershipExtn: "6 Months",
                removeMembership: false,
            });
        } catch (error) {
            console.error("Error updating/removing membership: ", error);
            alert("Error processing the membership update.");
        }
    };

    return (
        <div className="membership-update-container">
            <h2>Update Membership</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Membership Number:
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
                    Membership Extension:
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="membershipExtn"
                            value="6 Months"
                            checked={formData.membershipExtn === "6 Months"}
                            onChange={handleChange}
                        />
                        6 Months
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="membershipExtn"
                            value="1 Year"
                            checked={formData.membershipExtn === "1 Year"}
                            onChange={handleChange}
                        />
                        One Year
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="membershipExtn"
                            value="2 Years"
                            checked={formData.membershipExtn === "2 Years"}
                            onChange={handleChange}
                        />
                        Two Years
                    </label>
                </label>
                <br />

                <label>
                    Membership Remove:
                    <input
                        type="checkbox"
                        name="removeMembership"
                        checked={formData.removeMembership}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                removeMembership: e.target.checked,
                            }))
                        }
                    />
                </label>
                <br />

                <button type="submit">
                    {formData.removeMembership ? "Remove Membership" : "Update Membership"}
                </button>
            </form>
        </div>
    );
};

export default MembershipUpdate;
