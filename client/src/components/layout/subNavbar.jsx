import React from 'react'
import { Navbar } from "flowbite-react";
import { Link } from 'react-router-dom';

const SubNavbar = () => {

  return (
    <div className='hidden md:inline'>
        <Navbar className='list-none border-b-2 w-full z-50 shadow-sm shadow-teal-100'>
            <Navbar.Link as={'div'}><Link to="/">Academics</Link></Navbar.Link>
            <Navbar.Link as={'div'}><Link to="/">Fiction</Link></Navbar.Link>
            <Navbar.Link as={'div'}><Link to="/">Non Fiction</Link></Navbar.Link>
            <Navbar.Link as={'div'}><Link to="/">Children</Link></Navbar.Link>
            <Navbar.Link as={'div'}><Link to="/">Comics & Graphic Novel</Link></Navbar.Link>
            <Navbar.Link as={'div'}><Link to="/">Comics & Graphic Novel</Link></Navbar.Link>
        </Navbar>
    </div>
  )
}

export default SubNavbar;