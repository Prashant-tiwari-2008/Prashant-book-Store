import React, { useState } from 'react'
import BookListSidebar from '../../components/layout/Sidebar'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBooks, fetchFilterConfig } from '../../services/bookService';
import Loader from '../../components/common/Loader';
import BookCard from '../../components/common/BookCard';

const BookList = () => {
  const { category } = useParams();
  const { isPending: filterPending, isError: isFilterError, data: filterConfigData, error: filtererror } = useQuery({ queryKey: ['filterConfig', category], queryFn: () => fetchFilterConfig(category), staleTime: 600000, })
  const { isPending, isError, data, error } = useQuery({ queryKey: ['bookData', category], queryFn: () => fetchBooks(category, 0, 15), staleTime: 600000, })
  const [filterOption, setFilterOption] = useState({});

  const Error = ({ message }) => <p>Error: {message}</p>;

  const onFilterChange = (filterLabel, filterValue) => {
    setFilterOption((prev) => {
      const updatedFilter = { ...prev };

      if (updatedFilter[filterLabel]) {
        const optionIndex = updatedFilter[filterLabel].indexOf(filterValue);
        if (optionIndex > -1) {
          updatedFilter[filterLabel].splice(optionIndex, 1);
        } else {
          updatedFilter[filterLabel].push(filterValue)
        }
      } else {
        updatedFilter[filterLabel] = [filterValue];
      }

      if (!updatedFilter[filterLabel].length) delete updatedFilter[filterLabel];
      return updatedFilter;
    })
  }

  console.log(filterOption,"filterOPtion")

  return (
    <div className='flex flex-col lg:flex-row my-10 gap-5'>
      <div className='w-full lg:w-1/4'>
        {filterPending ?
          <div className='flex justify-center items-center my-5'> <Loader /></div> : isFilterError ?
            <Error message={filtererror.message} /> :
            <BookListSidebar filterConfig={filterConfigData} filterOption={filterOption} onFilterChange={onFilterChange} />
        }
      </div>
      <div className='flex justify-between flex-wrap gap-4'>
        {isPending ?
          <div className='flex justify-center items-center my-5'> <Loader /></div> : isError ?
            <Error message={error.message} /> :
            <>
              {data && data.map((book,index) => (
                <BookCard key={index} book={book} />
              ))}
            </>
        }
      </div>
    </div>
  )
}

export default BookList;
