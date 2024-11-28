import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from '../components/AdminLogin';
import UserLogin from '../components/UserLogin';
import AdminHome from '../components/AdminHome';
import UserHome from '../components/UserHome';
import Transactions from '../components/transactions/Transactions';
import IsBookAvailable from '../components/transactions/IsBookAvailable';
import IssueBook from '../components/transactions/IssueBook';
import ReturnBook from '../components/transactions/ReturnBook';
import PayFine from '../components/transactions/PayFine';
import Header from '../components/Header';

const AppRoutes = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/admin/home" element={<AdminHome />} />
                <Route path="/user/home" element={<UserHome />} />
                <Route path="/transactions" element={<Transactions />}>
                    <Route path="is-book-available" element={<IsBookAvailable />} />
                    <Route path="issue-book" element={<IssueBook />} />
                    <Route path="return-book" element={<ReturnBook />} />
                    <Route path="pay-fine" element={<PayFine />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
