import React from 'react';

const AdminHome = () => {
    const products = [
        { codeFrom: '100', codeTo: '200', category: 'Fiction' },
        { codeFrom: '201', codeTo: '300', category: 'Science' },
        { codeFrom: '301', codeTo: '400', category: 'History' },
    ];

    return (
        <div>
            <h2>Admin Home</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Code From</th>
                        <th>Code To</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.codeFrom}</td>
                            <td>{product.codeTo}</td>
                            <td>{product.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminHome;
