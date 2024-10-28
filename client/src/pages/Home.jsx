import React from 'react'
import Banner from '../components/layout/Banner'
import BookCarousel from '../components/layout/BookCarousel'

const Home = () => {

  const booktest = new Array(10).fill('test');
  return (
    <div>
      <Banner />
      <BookCarousel title={"BestSeller"} books={booktest} />
      <BookCarousel title={"Our Best Fiction Books"} books={booktest} />
      <BookCarousel title={"Our Best Nonfiction Books"} books={booktest} />
      <BookCarousel title={"Indian Love Stories"} books={booktest} />
      <BookCarousel title={"Short Self-Help Books"} books={booktest} />
    </div>
  )
}

export default Home