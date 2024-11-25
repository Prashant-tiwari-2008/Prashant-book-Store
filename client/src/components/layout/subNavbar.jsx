import React from 'react'
import { Navbar } from "flowbite-react";
import { Link } from 'react-router-dom';


const CATEGORIES = [
  { key: 'academicsBestSeller', label: 'ACADEMICS', category: 'STUDY' },
  { key: 'fictionBestSeller', label: 'FICTION', category: 'Fiction' },
  { key: 'economicsBestSeller', label: 'Non Fiction', category: 'BUSINESS' },
  { key: 'comicsBestSeller', label: 'Children', category: 'COMICS' },
  { key: 'youngBestSeller', label: 'YOUNG ADULT', category: 'YOUNG' },
];

const SubNavbar = () => {

  return (
    <div className='hidden md:inline'>
      <Navbar className='list-none border-b-2 w-full z-50 shadow-sm shadow-teal-100'>
        {CATEGORIES.map(({ key, label, category }) => (
          <Navbar.Link key={key} as={'div'}><Link to={`/bookList/${category}`} ><p className='cursor-pointer'>{label}</p></Link></Navbar.Link>
        ))}
      </Navbar>
    </div>
  )
}

export default SubNavbar;