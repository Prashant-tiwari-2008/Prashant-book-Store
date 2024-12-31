import React from 'react'
import bookSample from '../../assets/images/book-Sample.jpg'
import CheckoutCard from '../../components/common/CheckoutCard';
import CartPricing from '../../components/common/CartPricing';
import { useSelector } from 'react-redux';

const Cart = () => {
  const { items: cartListItems, totalitems } = useSelector((state) => state.cart)
  
  return (
    <div className="my-5">
      <div className='flex'>
        <div className='flex flex-col basis-[68%] mx-3 shadow-md dark:shadow-gray-600 rounded p-5'>
          <p>Total Items {totalitems}</p>
          {cartListItems ?
            (cartListItems.map((book) => <CheckoutCard book={book.bookId} quantity={book.quantity} key={book._id} />)) :
            (
              <div className='flex justify-center items-center flex-col h-full'>
                <h1 className='text-2xl'>No item in the cart!</h1>
                <p>Please add some item</p>
              </div>

            )}
        </div>
        <span className="col-span-1 w-0 border-gray-200 dark:border-gray-600 border-dashed border-l-[0.5px] border-disabled mx-4"></span>
        <CartPricing />
      </div>
    </div>
  )
}

export default Cart;