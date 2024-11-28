// src/components/maintenance/BooksMoviesAdd.js
import React, { useState } from "react";
import { db } from "../firebase"; // Import Firebase methods
import { collection, addDoc } from "firebase/firestore";

const BooksMoviesAdd = () => {
  const [formData, setFormData] = useState({
    serialNo: "",
    type: "Book", // Default to Book
    name: "",
    author: "",
    category: "",
    status: "Available", // Default status
    cost: "",
    procurementDate: "",
    quantity: 1, // Default to 1
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
      await addDoc(collection(db, "booksMovies"), formData);
      alert("Book/Movie added successfully!");
      // Optionally reset form after submission
      setFormData({
        serialNo: "",
        type: "Book",
        name: "",
        author: "",
        category: "",
        status: "Available",
        cost: "",
        procurementDate: "",
        quantity: 1,
      });
    } catch (error) {
      console.error("Error adding Book/Movie: ", error);
    }
  };

  return (
    <div className="books-movies-add-container">
      <h2>Add Book/Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Serial Number:
          <input
            type="text"
            name="serialNo"
            value={formData.serialNo}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Type:
          <br />
          <label>
            <input
              type="radio"
              name="type"
              value="Book"
              checked={formData.type === "Book"}
              onChange={handleChange}
            />
            Book
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="Movie"
              checked={formData.type === "Movie"}
              onChange={handleChange}
            />
            Movie
          </label>
        </label>
        <br />

        <label>
          Book/Movie Name:
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
          Author:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
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
            <option value="Available">Available</option>
            <option value="Checked Out">Checked Out</option>
          </select>
        </label>
        <br />

        <label>
          Cost:
          <input
            type="text"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Date of Procurement:
          <input
            type="date"
            name="procurementDate"
            value={formData.procurementDate}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Quantity/Copies:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </label>
        <br />

        <button type="submit">Add Book/Movie</button>
      </form>
    </div>
  );
};

export default BooksMoviesAdd;
