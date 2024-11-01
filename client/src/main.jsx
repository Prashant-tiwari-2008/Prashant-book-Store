import React from 'react';
import ReactDom from 'react-dom/client'
import App from './App.jsx';
import './index.css';
import './styles/global.css'
import { Provider } from 'react-redux'
import ThemeProvider from './context/ThemeContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { store } from './redux/store.js';


const queryClient = new QueryClient()

ReactDom.createRoot(document.getElementById('root')).render(
    <>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    </>
)