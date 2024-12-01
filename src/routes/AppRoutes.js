import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminLogin from '../components/AdminLogin';
import UserLogin from '../components/UserLogin';
import AdminHome from '../components/AdminHome';
import UserHome from '../components/UserHome';
import Header from '../components/Header';

// Transactions Routes
import Transactions from '../components/transactions/Transactions';
import IsBookAvailable from '../components/transactions/IsBookAvailable';
import IssueBook from '../components/transactions/IssueBook';
import ReturnBook from '../components/transactions/ReturnBook';
import PayFine from '../components/transactions/PayFine';
import SearchResults from '../components/transactions/SearchResults';
// Report Routes
import Reports from '../components/reports/Reports';
import MasterListOfBooks from '../components/reports/MasterListOfBooks';
import MasterListOfMovies from '../components/reports/MasterListOfMovies';
import MasterListOfMemberships from '../components/reports/MasterListOfMemberships';
import ActiveIssues from '../components/reports/ActiveIssues';
import OverdueReturns from '../components/reports/OverdueReturns';
import PendingIssueRequests from '../components/reports/PendingIssueRequests';

// Maintenance Routes
import Maintenance from '../components/maintenance/Maintenance';
import MembershipAdd from '../components/maintenance/MembershipAdd';
import MembershipUpdate from '../components/maintenance/MembershipUpdate';
import BooksMoviesAdd from '../components/maintenance/BooksMoviesAdd';
import BooksMoviesUpdate from '../components/maintenance/BooksMoviesUpdate';
import UserManagement from '../components/maintenance/UserManagement';
import Login from '../components/Login';

const AppRoutes = () => {
    return (
        <Router>
            <Header />
            <Routes>
                {/* Authentication Routes */}
                <Route exact path="/" element={<Login />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/admin/home" element={<AdminHome />} />
                <Route path="/user/home" element={<UserHome />} />

                {/* Transactions Routes */}
                <Route path="/transactions" element={<Transactions />}>
                    <Route path="is-book-available" element={<IsBookAvailable />} />
                    <Route path="issue-book" element={<IssueBook />} />
                    <Route path="return-book" element={<ReturnBook />} />
                    <Route path="pay-fine" element={<PayFine />} />
                    <Route path="is-book-available/search-results" element={<SearchResults />} />
                </Route>

                {/* Reports Routes */}
                <Route path="/reports" element={<Reports />}>
                    <Route path="master-list-of-books" element={<MasterListOfBooks />} />
                    <Route path="master-list-of-movies" element={<MasterListOfMovies />} />
                    <Route path="master-list-of-memberships" element={<MasterListOfMemberships />} />
                    <Route path="active-issues" element={<ActiveIssues />} />
                    <Route path="overdue-returns" element={<OverdueReturns />} />
                    <Route path="pending-issue-requests" element={<PendingIssueRequests />} />
                </Route>

                {/* Maintenance Routes */}
                <Route path="/maintenance" element={<Maintenance />}>
                    <Route path="membership/add" element={<MembershipAdd />} />
                    <Route path="membership/update" element={<MembershipUpdate />} />
                    <Route path="books-movies/add" element={<BooksMoviesAdd />} />
                    <Route path="books-movies/update" element={<BooksMoviesUpdate />} />
                    <Route path="user-management" element={<UserManagement />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
