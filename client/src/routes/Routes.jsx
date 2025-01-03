import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import Breadcrumbs from '../components/layout/Breadcrumbs';
import WishlistPage from '../pages/User/WishlistPage';
import NonLoggedInRoutes from './NonLoggedInRoutes';
import FooterComponent from '../components/layout/Footer';


const AppRoutes = () => {
    const location = useLocation();
    const hideHeaderAndBreadcrumbsAndFooter = location.pathname === '/login' || location.pathname === "/register"

    return (
        <>
            {!hideHeaderAndBreadcrumbsAndFooter && <Header />}
            <div className='md:container md:mx-auto mb-[68px]'>
                {!hideHeaderAndBreadcrumbsAndFooter && <Breadcrumbs />}
                <Routes>
                    {/*NonLoggedInRoutes  */}
                    <Route element={<NonLoggedInRoutes />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/bookDetail/:bookId" element={<BookDetail />} />
                    <Route path="/bookList/:category" element={<BookList />} />
                    <Route path="/searchResult" element={<SearchResult />} />

                    {/* Private routes - validation add later*/}
                    <Route element={<PrivateRoutes />}>
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/wishlist" element={<WishlistPage />} />
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
            {!hideHeaderAndBreadcrumbsAndFooter && <FooterComponent />}
        </>
    )
}

export default AppRoutes;