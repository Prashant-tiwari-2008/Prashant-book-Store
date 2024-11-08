import React, { useState } from 'react'
import { Avatar, Dropdown, DropdownDivider, DropdownItem, Navbar, TextInput, theme } from 'flowbite-react'
import ThemeToggle from '../other/themeToggle'
import { FaCartArrowDown, FaSearch } from "react-icons/fa";
import logo from './../../../public/images/logo.png'
import { Link } from 'react-router-dom';
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
        <div className='flex gap-4 md:order-2'>
          <ThemeToggle />
          {currentUser ?
            (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  // <Avatar alt="User" img={logo} rounded bordered color='success' status="online" size="md" />
                  <div className='border-[1px] border-teal-100 rounded-full w-[60px]'>
                    <h1 className='font-bold text-3xl self-center'>{currentUser?.firstName?.slice(0,1).toUpperCase()}</h1>  {/* // todo : either user Image or the first letter of name */}
                  </div>
                }
              >
                <Dropdown.Header className='flex flex-col gap-2'>
                  <p>{currentUser.firstName}</p>
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
          <Link to="/cart">
            <FaCartArrowDown className='md:text-4xl' />
          </Link>
          <Link to="/wishlist">
            <p>W</p>
          </Link>
        </div>
      </Navbar >
      <SubNavbar />
    </>
  )
}

export default Header