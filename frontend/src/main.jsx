import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider } from "@clerk/clerk-react"

const ClerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!ClerkPublishableKey) {
  throw new Error("Missing Publishible key")
}

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <ClerkProvider publishableKey={ClerkPublishableKey}>
        <App />
    </ClerkProvider>

  </React.StrictMode>,
)