import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TransactionProvider } from './components/context/context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TransactionProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </TransactionProvider>
  
)
