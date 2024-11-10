import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchBook, fetchBooks } from '../../services/bookService';
import WishlistButton from '../../components/common/WishlistButton';
import Loader from '../../components/common/Loader';
import { Rating, TextInput } from "flowbite-react";
import CustomeButton from '../../components/common/Button';
import BookCarousel from '../../components/layout/BookCarousel';

const Error = ({ message }) => <p>Error: {message}</p>;
let tc = [
  { name: "Piracy free", url: "http://localhost:5173/src/assets/images/pivacy.svg" },
  { name: "Assured Quality", url: "http://localhost:5173/src/assets/images/assured.svg" },
  { name: "Secure Transactions", url: "http://localhost:5173/src/assets/images/secure.svg" },
  { name: "Fast Delivery", url: "http://localhost:5173/src/assets/images/fast.svg" },
  { name: "Sustainably Printed", url: "http://localhost:5173/src/assets/images/printed.svg" },
]

const BookDetail = () => {
  const [pincode, setpinCode] = useState('');
  const [deliveryData, setDeliveryData] = useState();
  const [quantity, setQuantity] = useState(1);
  const { bookId } = useParams();
  const queryClient = useQueryClient();
  const dynamicArray = new Array(5);

  // use the cached data if it sexists in the cache usenr the "book" key 
  // check if the data is coming from cache or not
  const { isPending, isError, data: book, error } = useQuery({
    queryKey: ['book', bookId], queryFn: () => fetchBook(bookId), initialData: () => {
      const books = queryClient.getQueryData('fictionBestSeller');
      return books?.find(b => b.id === bookId);
    }
  })

  // publisher
  const { isPending: relatedBookPending, isError: relatedBookIsError, data: relatedBook, error: relatedBookError } = useQuery({
    queryKey: ['relatedBook', book?.publisher],
    queryFn: () => fetchBooks({ Publisher: book?.publisher }),
    enabled: !!book?.publisher // run only publisher available
  })

  const handleSubmit = () => {
    console.log(pincode.length, "pincode")
    let days = Math.floor(Math.random() * 10) + 1
    setDeliveryData(days);
  }

  const incQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decQuantity = () => {
    setQuantity(prev => prev - 1)
  }

  return (
    <div className='my-5'>
      {isPending ?
        <div className='flex justify-center items-center'> <Loader /></div> : isError ?
          <Error message={error.message} /> :
          <>
            {book &&
              <div className='flex flex-col'>
                {/* book Detail */}
                <div className='flex my-5 gap-5'>

                  {/* book image */}
                  <div className='basis-1/4'>
                    <div className="flex flex-col">
                      <div className='shadow-lg p-3 dark:shadow-cyan-500/50 '>
                        <div className='float-left absolute '>
                          <WishlistButton book={book} />
                        </div>
                        <img src={book.ThumbnailURL} />
                      </div>
                      <div className='flex gap-3 my-6 overflow-hidden'>
                        {dynamicArray.fill(book.ThumbnailURL).map((imgage, index) => (
                          <img src={imgage} className='h-24 w-20' key={index} />)
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className='basis-1/2 flex flex-col justify-start gap-2 ml-4 mt-2' >
                    {/*Name and othe detail  */}
                    <div className='flex flex-col justify-start gap-2 ml-2'>
                      <h1 className='text-4xl font-medium'>{book.title}</h1>
                      <h3 className='text-2xl'>By <span className='underline'>{book.author[0] || "Dummy author"}</span></h3>
                      <div className="flex gap-4 w-8 my-2 items-center">
                        <span className='text-xl'>Lang</span>
                        <CustomeButton title={book.PublishedLanguage} />
                      </div>
                      <Rating>
                        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400 mx-2">4.75</p>
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star filled={false} />
                        <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                        <a href="#" className="text-sm font-medium text-gray-900  dark:text-white">
                          ( 73 reviews )
                        </a>
                      </Rating>
                    </div>
                    <hr className="h-[2px] mt-2 bg-gray-200 border-0 dark:bg-gray-700" />
                    {/* term and condition */}
                    <div className='flex gap-6 items-start mt-8'>
                      {tc.map((t, index) => {
                        return (
                          <div className='flex flex-col gap-2 text-center justify-center items-center w-[62px]' key={index}>
                            <img src={t.url} className='text-center' />
                            <div>
                              <p className=' w-[62px] text-secondary-black font-normal text-small tracking-normal font-manrope'>{t.name}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <hr className="h-[2px] mt-2 bg-gray-200 border-0 dark:bg-gray-700" />


                    {/* pincode and delivery date*/}
                    <div className='flex flex-col gap-3'>
                      <div className='flex gap-3 mt-8'>
                        <form className='hidden lg:inline-block'>
                          <TextInput
                            type="text"
                            placeholder='Enter Pincode'
                            className='w-[20rem]'
                            // rightIcon={CustomeButton}
                            value={pincode}
                            onChange={(e) => setpinCode(e.target.value)}
                          />
                        </form>
                        <CustomeButton title={'CHECK'} handleClick={handleSubmit} disable={pincode.length <= 5} />

                      </div>
                      {!deliveryData && <p>Please enter pincode to check delivery time.</p>}
                      {deliveryData && <p>{`You item will be deliverd in ${deliveryData} day.`} </p>}
                    </div>

                    {/* Other Details */}
                    <div>
                      <p>*COD & Shipping Charges may apply on certain items.</p>
                      <p>Review final details at checkout.</p>
                    </div>

                  </div>

                  {/* vertical line */}
                  <div className="h-auto w-[2px] bg-gray-200 border-0 dark:bg-gray-700 mx-4"></div>

                  {/* card option */}
                  <div className='basis-1/4 flex flex-col gap-6'>
                    {/* book price detail */}
                    <div className='flex flex-col p-5 gap-1 mb-2.5 w-[300px] bg-transparent cursor-pointer border-[0.76px] border-[#bfbfbf] rounded-md'>
                      <p>{book.Casing}</p>
                      <div className='flex gap-2 mt-1 text-lg items-center'>
                        <div className='font-semibold text-3xl text-blue-600'><span>₹{book.selling_price}</span></div>
                        <div className='line-through'><span>₹{book.retail_price}</span></div>
                        <div><span>({(book.discount)}%) off</span></div>
                      </div>
                      <p>{'(All inclusive*)'}</p>
                    </div>

                    {/* Book Quantity */}
                    <div className='flex gap-3 flex-col'>
                      <div className='flex gap-3 items-center'>
                        <p className='font-medium text-xl'>Quantity :</p>
                        <CustomeButton handleClick={decQuantity} title={'-'} disable={quantity < 2} />
                        <p className='font-medium text-2xl mx-1'>{quantity}</p>
                        <CustomeButton handleClick={incQuantity} title={'+'} disable={quantity > 5} />
                      </div>
                      {quantity == 6 && <p className='text-xl text-blue-500'>You can not order more than {quantity}.</p>}
                    </div>

                    {/* order */}
                    <div className='flex flex-col gap-4 w-[300px]'>
                      <CustomeButton title={'Add to Cart'} />
                      <CustomeButton title={'Buy Now'} />
                      <CustomeButton title={'Add to Wishlist'} />

                    </div>
                  </div>

                </div>

                {/* Book Description */}
                <div className='flex flex-col gap-3'>
                  <h1 className='font-bold text-2xl'>About The Book</h1>
                  <h1 className='font-semibold text-xl'><span className='border-b-4 p-1 border-blue-500'>
                    Description :- </span></h1>
                  {/* <p>{book.longdesc}</p> */}
                  {book.longdesc ? <div className="md:text-lg" dangerouslySetInnerHTML={{ __html: book.longdesc }} />
                    : <p>{'Descritpion is not available'}</p>
                  }
                </div>

                {/* Other detail */}
                <div className='flex flex-col gap-3 my-5 border-[0.76px] border-[#bfbfbf] rounded-md py-5'>
                  <h1 className='font-bold text-2xl px-3'>Book Detail :-</h1>
                  <div className='flex flex-col gap-2 px-6'>
                    <p>ISBN 13 : {book.ISBN} |</p>
                    <p>Publication Date : {new Date(book.PublicationDate).toDateString()}  |</p>
                    <p>Pages : {book.PageCount} |</p>
                    <p>Imprint : {book.PublisherName_slug_field} |</p>
                    <p>Publisher : {book.publisher} |</p>
                  </div>
                </div>
              </div>
            }
          </>
      }

      {/* Related book */}
      {relatedBookPending ? <div className='flex justify-center items-center my-5'> <Loader /></div>
        : relatedBookIsError ? <Error message={relatedBookError.message} /> : <>
          {relatedBook && <BookCarousel title={"Related Books"} books={relatedBook.data} />}
        </>
      }
    </div>
  )
}

export default BookDetail