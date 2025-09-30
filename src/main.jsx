import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { Toaster } from 'sonner';
import { CartProvider } from './context/CartContext.jsx';
import { SearchProvider } from './context/SearchContext';
import "preline/preline";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
    <SearchProvider>
    <CartProvider>
      <App />
      <Toaster richColors position="top-center" />
    </CartProvider>
    </SearchProvider>
    </ClerkProvider>
  </StrictMode>,
)
