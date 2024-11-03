import React, { useState } from 'react'
import { Pagination } from "flowbite-react";

const BookPagination = ({ totalLength, currentPage, setCurrentPage }) => {
    
    const onPageChange = (page) => setCurrentPage(page);
    const totalPage = Math.ceil(totalLength / 15)

    return (
        <div className="flex overflow-x-auto sm:justify-center">
            <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={onPageChange} />
        </div>
    )
}

export default BookPagination