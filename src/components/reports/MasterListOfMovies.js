import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const MasterListOfMovies = () => {
    // Sample data for the movies (replace with actual data from your backend or API)
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Function to fetch movie data from Firestore
        const fetchMovies = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'movies'));  // Firestore collection for movies
                const moviesArray = [];
                querySnapshot.forEach((doc) => {
                    moviesArray.push(doc.data());  // Adding movie data to the array
                });
                setMovies(moviesArray);  // Updating the state with fetched movies
            } catch (error) {
                console.error("Error fetching movies: ", error);
            }
        };

        fetchMovies();  // Fetch movie data on component mount
    }, []);

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
                    {movies.map((movie, index) => (
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
