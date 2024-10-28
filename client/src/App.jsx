import React, { useState } from 'react'
import './index.css';
import AppRoutes from './routes/Routes';
import { sampledata } from '../z-sample';

const App = () => {
  let[book,setBook] = useState();
  const result = sampledata.pageProps.ISR_homeContainerList.flatMap(item => item.products || []);
  console.log(result,"sample value")

  return (
    <AppRoutes />
  )
}

export default App;