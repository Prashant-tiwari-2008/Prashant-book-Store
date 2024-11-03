import React, { useState } from 'react'
import BookListSidebar from '../../components/layout/Sidebar'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBooks, fetchFilterConfig } from '../../services/bookService';
import Loader from '../../components/common/Loader';
import BookCard from '../../components/common/BookCard';
import BookPagination from '../../components/common/Pagination';

const BookList = () => {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOption, setFilterOption] = useState({ BisacCode: category });

  const { isPending: filterPending, isError: isFilterError, data: filterConfigData, error: filtererror } = useQuery({ queryKey: ['filterConfig', category], queryFn: () => fetchFilterConfig(category), staleTime: 600000, })
  const { isPending, isError, data, error } = useQuery({ queryKey: ['bookData', filterOption, currentPage], queryFn: () => fetchBooks(filterOption, currentPage), staleTime: 600000, })

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

  return (
    <>
      <div className='flex flex-col lg:flex-row my-8 gap-5'>
        <div className='w-full lg:w-1/4'>
          {filterPending ?
            <div className='flex justify-center items-center my-5'> <Loader /></div> : isFilterError ?
              <Error message={filtererror.message} /> :
              <BookListSidebar filterConfig={filterConfigData} filterOption={filterOption} onFilterChange={onFilterChange} />
          }
        </div>
        <div className='flex justify-start flex-wrap gap-8'>
          {isPending ?
            <div className='flex justify-center items-center my-5'> <Loader /></div> : isError ?
              <Error message={error.message} /> :
              <>
                {data.data && data.data.map((book, index) => (
                  <BookCard key={index} book={book} />
                ))}
              </>
          }
        </div>
      </div>
      {data && <BookPagination className="float-left" totalLength={data.totalBooks} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
    </>
  )
}

export default BookList;
