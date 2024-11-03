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
import Header from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Breadcrumbs from '../components/layout/Breadcrumbs';


const AppRoutes = () => {
    return (
        <Router>
            <Header />
            <div className='md:container md:mx-auto'>
                <Breadcrumbs />
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/bookDetail/:bookId" element={<BookDetail />} />
                    <Route path="/bookList/:category" element={<BookList />} />
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
            </div>
            <Footer />
        </Router>
    )
}

export default AppRoutes;