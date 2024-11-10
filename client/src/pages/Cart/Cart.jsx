import React from 'react'
import bookSample from '../../assets/images/book-Sample.jpg'
import CheckoutCard from '../../components/common/CheckoutCard';

let book = {
  ThumbnailURL: bookSample,
  author: ["testing"],
  title: "sample book name",
  selling_price: 100,
  retail_price: 100,
  discount: 300
}

const Cart = () => {
  return (
    <div className="my-5">
      <div className='flex'>

        {/* item listing */}
        <div className='flex flex-col basis-[68%] mx-3'>
          <p>Total Items (8)</p>
          <CheckoutCard book={book} />
        </div>

        {/* vertical lise */}
        {/* <div className="h-auto w-[2px] bg-gray-200 dark:bg-gray-700 mx-4" ></div> */}
        <span className="col-span-1 w-0 border-gray-200 dark:border-gray-600 border-dashed border-l-[0.5px] border-disabled mx-4"></span>
        {/* pricing detail */}
        <div className='flex basis-[32%]'>
          <p>testgin</p>
        </div>
      </div>
    </div>
  )
}

export default Cart;