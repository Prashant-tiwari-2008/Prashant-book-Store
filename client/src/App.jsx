import React from 'react'
import './index.css';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AppRoutes from './routes/Routes';
const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App