import React from 'react'
import Banner from '../components/layout/Banner'
import BookCarousel from '../components/layout/BookCarousel'

const Home = () => {

  return (
    <div>
      <Banner />
      <BookCarousel title={"BestSeller"} books={['']}/>
      Home
    </div>
  )
}

export default Home