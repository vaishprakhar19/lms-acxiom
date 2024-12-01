import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const { results } = location.state || { results: [] };

    console.log(results);

    return (
        <div>
            <h2>Search Results</h2>
            {results.length > 0 ? (
                <table border="1" cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Book Name</th>
                            <th>Author</th>
                            <th>Serial Number</th>
                            <th>Availability</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={index}>
                                <td>{result.name}</td>
                                <td>{result.author}</td>
                                <td>{result.serialNo}</td>
                                <td>{result.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchResults;
