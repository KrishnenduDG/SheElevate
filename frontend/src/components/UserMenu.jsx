import useModal from '@/hooks/useModal'
import { SignIn, SignOutButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import React from 'react'

const Modal = ({isOpen}) => {
 
  if (!isOpen) {
    return null
  }
  
  return (
    <div className='modal'>
      <SignedIn>
        <div>
          <a href="profile">Profile</a>
          <hr />
          <SignOutButton 
            
          />
        </div>
      </SignedIn>
      <SignedOut>
        <div className="Modal_Container">
          <a href="/auth">SignIn</a>
          <a href="/auth">Login</a>
        </div>
      </SignedOut>
    </div>
  )
}

export default Modal