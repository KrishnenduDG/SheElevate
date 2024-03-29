import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider } from "@clerk/clerk-react"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthenticationPage from './pages/AuthenticationPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import LandingPage from './pages/LandingPage.jsx'

const ClerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!ClerkPublishableKey) {
  throw new Error("Missing Publishible key")
}

// const router = createBrowserRouter([
//   {
//     children: [
//       { path: "/", element: <LandingPage />},
//       { path: "/auth", element: <AuthenticationPage /> },
//       { path: "/profile", element: <ProfilePage /> }
//     ]
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <ClerkProvider publishableKey={ClerkPublishableKey}>
      {/* <RouterProvider router={router} /> */}
        <App />
    </ClerkProvider>

  </React.StrictMode>,
)