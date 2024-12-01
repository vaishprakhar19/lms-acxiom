// src/components/maintenance/BooksMoviesUpdate.js
import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firebase methods
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const BooksMoviesUpdate = () => {
  const [type, setType] = useState("Book"); // Default to Book
  const [selectedEntry, setSelectedEntry] = useState(""); // Selected entry ID
  const [formData, setFormData] = useState({
    name: "",
    serialNo: "",
    status: "Available",
    date: "",
  });

  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : []; // Default to an empty array
});

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setSelectedEntry("");
    setFormData({
      name: "",
      serialNo: "",
      status: "Available",
      date: "",
    });
  };

  const handleEntryChange = (e) => {
    const selected = books.find((entry) => entry.id === e.target.value);
    setSelectedEntry(e.target.value);
    setFormData({
      name: selected?.name || "",
      serialNo: selected?.serialNo || "",
      status: selected?.status || "Available",
      date: selected?.procurementDate || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEntry) {
      alert("Please select a Book/Movie to update.");
      return;
    }

    try {
      const entryRef = doc(db, "books", selectedEntry);
      await updateDoc(entryRef, {
        ...formData,
        type,
      });
      alert("Book/Movie updated successfully!");
    } catch (error) {
      console.error("Error updating Book/Movie: ", error);
    }
  };

  return (
    <div className="books-movies-update-container">
      <h2>Update Book/Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <br />
          <label>
            <input
              type="radio"
              name="type"
              value="Book"
              checked={type === "Book"}
              onChange={handleTypeChange}
            />
            Book
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="Movie"
              checked={type === "Movie"}
              onChange={handleTypeChange}
            />
            Movie
          </label>
        </label>
        <br />

        <label>
          Select Book/Movie:
          <select value={selectedEntry} onChange={handleEntryChange} required>
            <option value="">-- Select --</option>
            {books
              .filter((entry) => entry.type === type)
              .map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.name} ({entry.serialNo})
                </option>
              ))}
          </select>
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
          Serial No:
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
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Update Book/Movie</button>
      </form>
    </div>
  );
};

export default BooksMoviesUpdate;
