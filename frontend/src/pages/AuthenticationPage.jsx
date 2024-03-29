import Navbar from '@/components/Navbar'
import useModal from '@/hooks/useModal'
import { RedirectToUserProfile, SignIn, SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import React from 'react'

const AuthenticationPage = () => {

  return (
    <div>
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