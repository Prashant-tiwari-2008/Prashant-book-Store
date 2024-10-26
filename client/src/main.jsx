import React from 'react';
import ReactDom from 'react-dom/client'
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux'
import ThemeProvider from './context/ThemeContext.jsx';
import { store } from './redux/store.js';

ReactDom.createRoot(document.getElementById('root')).render(
    <>
        <Provider store={store}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </Provider>
    </>
)