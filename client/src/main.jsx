import React from 'react';
import ReactDom from 'react-dom/client'
import App from './App.jsx';
import { Provider } from 'react-redux'
import './index.css';
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