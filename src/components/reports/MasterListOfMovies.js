import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const MasterListOfMovies = () => {
    // Sample data for the movies (replace with actual data from your backend or API)
    const [movies, setMovies] = useState(() => {
        const storedBooks = localStorage.getItem("books");
        return storedBooks ? JSON.parse(storedBooks) : []; // Default to an empty array
    });

    return (
        <div>
            <h3>Master List of Movies</h3>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Serial No</th>
                        <th>Name of Movie</th>
                        <th>Author Name</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Cost</th>
                        <th>Procurement Date</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.filter(book => book.type === 'Movie').map((movie, index) => (
                        <tr key={index}>
                            <td>{movie.serialNo}</td>
                            <td>{movie.name}</td>
                            <td>{movie.author}</td>
                            <td>{movie.category}</td>
                            <td>{movie.status}</td>
                            <td>{movie.cost}</td>
                            <td>{movie.procurementDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MasterListOfMovies;
