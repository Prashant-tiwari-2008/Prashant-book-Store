import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import DashBoard from '../pages/Admin/Dashboard'
import ManageBooks from '../pages/Admin/ManageBooks'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import BookDetail from '../pages/Books/BookDetail'
import BookList from '../pages/Books/BookList'
import SearchResult from '../pages/Books/SearchResult'
import Cart from '../pages/cart/Cart'
import Checkout from '../pages/cart/Checkout'
import Profile from '../pages/User/Profile'
import OrderHistory from '../pages/User/OrderHistory'
import PageNotFound from '../pages/PageNotFound';
import PrivateRoutes from './PrivateRoutes'
import AdminRoute from './AdminRoutes'


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/bookDetail/:id" element={<BookDetail />} />
                <Route path="/bookList" element={<BookList />} />
                <Route path="/searchResult" element={<SearchResult />} />

                {/* Private routes - validation add later*/}
                <Route element={<PrivateRoutes />}>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orderHistory" element={<OrderHistory />} />
                </Route>

                {/* admin Routing - valiation add later*/}
                <Route element={<AdminRoute />}>
                    <Route path="/dashBoard" element={<DashBoard />} />
                    <Route path="/manageBooks" element={<ManageBooks />} />
                </Route>

                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;