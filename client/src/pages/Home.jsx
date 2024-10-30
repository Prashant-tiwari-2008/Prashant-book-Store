import React from 'react'
import Banner from '../components/layout/Banner'
import BookCarousel from '../components/layout/BookCarousel'
import { useQuery } from '@tanstack/react-query'
import { fetchBooks } from '../services/bookService'
import { isPending } from '@reduxjs/toolkit'
import Loader from '../components/common/Loader'


const CATEGORIES = [
  { key: 'fictionBestSeller', label: 'FICTION BestSeller', category: 'Fiction' },
  { key: 'economicsBestSeller', label: 'BUSINESS & ECONOMICS BestSeller', category: 'BUSINESS & ECONOMICS' },
  { key: 'academicsBestSeller', label: 'ACADEMICS BestSeller', category: 'STUDY' },
  { key: 'comicsBestSeller', label: 'COMICS & GRAPHIC BestSeller', category: 'COMICS & GRAPHIC' },
  { key: 'youngBestSeller', label: 'YOUNG ADULT BestSeller', category: 'YOUNG ADULT' },
];


const Error = ({ message }) => <p>Error: {message}</p>;

const Home = () => {

  return (
    <div>
      <Banner />
      {CATEGORIES.map(({ key, label, category }) => {
        const { isPending, isError, data, error } = useQuery({
          queryKey: [key],
          queryFn: () => fetchBooks(category, 0, 9)
        });

        if (isPending) return <div key={key} className='flex justify-center items-center my-5'> <Loader /></div>
        if (isError) return <Error key={key} message={error.message} />
        return data && <BookCarousel key={key} title={label} books={data} />;
      })}
    </div>
  )
}

export default Home;