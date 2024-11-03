import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Dropdown, DropdownDivider, DropdownItem, Navbar, TextInput, theme } from 'flowbite-react'
import ThemeToggle from '../other/themeToggle'
import { FaSearch } from "react-icons/fa";
import logo from './../../../public/images/logo.png'
import { Link } from 'react-router-dom';
import Cart from '../../pages/cart/Cart';
import { useSelector } from 'react-redux';
import SubNavbar from './subNavbar';
import Button from '../common/Button';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState();
  const { currentUser } = useSelector(state => state.user);


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const signOut = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <Navbar className='border-b-2 w-full z-50 shadow-md shadow-teal-100'>
        <Link to="/" className='self-center whitespace-nowrap'>
          <img src={logo} alt="logo" className='h-14' />
        </Link>
        <form onSubmit={handleSubmit} className='hidden lg:inline-block'>
          <TextInput
            type="text"
            placeholder='Search Book...'
            rightIcon={FaSearch}
            className='w-[42rem]'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div className='flex gap-3 md:order-2'>
          <ThemeToggle />
          {currentUser ?
            (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="User" img={logo} rounded bordered color='success' status="online" size="md" />
                }
              >
                <Dropdown.Header>
                  <p>{currentUser.name}</p>
                  <p>{currentUser.email}</p>
                </Dropdown.Header>
                <Link to={'/profile'}>
                  <DropdownItem>Profile</DropdownItem>
                </Link>
                <Link to={'/wishlist'}>
                  <DropdownItem>WishList</DropdownItem>
                </Link>
                <DropdownDivider />
                <Dropdown.Item onClick={signOut}>Log Out</Dropdown.Item>
              </Dropdown>
            )
            :
            (<Link to="/sign-in">
              <Button title={"log In"} />
            </Link>)
          }
          <Link to="/wishlist">WIsh</Link>
          <Cart />
        </div>
      </Navbar >
      <SubNavbar />
    </>
  )
}

export default Header