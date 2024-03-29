import Navbar from '@/components/Navbar'
import useModal from '@/hooks/useModal'
import { RedirectToUserProfile, SignIn, SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import React from 'react'
import './styles.css'

const AuthenticationPage = () => {

  return (
    <div className="entire">
      <SignedOut>
        <div className='card-container'>
          <SignIn />
        </div>
        {/* <SignInButton /> */}
      </SignedOut>
      <SignedIn>
        <RedirectToUserProfile />
      </SignedIn>
    </div>
  )
}

export default AuthenticationPage