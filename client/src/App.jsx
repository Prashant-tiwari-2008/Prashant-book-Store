import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import AppRoutes from './routes/Routes';


const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App;