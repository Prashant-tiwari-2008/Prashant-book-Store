import React from 'react';
import { store } from './redux/store.js';
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDom from 'react-dom/client'
import App from './App.jsx';
import ThemeProvider from './context/ThemeContext.jsx';
import AuthProvider from './context/AuthContext.jsx';
import './index.css';
import './styles/global.css'


const queryClient = new QueryClient()

ReactDom.createRoot(document.getElementById('root')).render(
    <>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </AuthProvider>
            </QueryClientProvider>
        </Provider>
    </>
)