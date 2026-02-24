import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import ThemeProvider from './context/themeContext.jsx'
import AuthProvider from './context/authContext.jsx'
import TransactionProvider from './context/transactionContext.jsx'
import DateProvider from './context/dateContext.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
   <StrictMode>
    <ThemeProvider>
     <AuthProvider>
      <TransactionProvider>
        <DateProvider>
       <App />
       </DateProvider>
       </TransactionProvider>
     </AuthProvider> 
    </ThemeProvider>
   </StrictMode>

   </BrowserRouter>

)
