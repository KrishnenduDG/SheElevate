import React from 'react'
import { HiMenu } from 'react-icons/hi'
import Modal from './UserMenu'
import './style.css'
import useModal from '@/hooks/useModal'

const Navbar = () => {
  const {isOpen, toggleModal} = useModal();


  return (
    <div className='navbar'>
      <button class="btn">Business</button>
      <div className="logo">
        {/* LOGO */}
        <img src="images/7.svg"/>
        
      </div>
      <div>
        <div className='modal-container'>
          <Modal isOpen={isOpen}/>
          <HiMenu
            onClick={toggleModal}
            height={100}
          />
        </div>
      </div>
    </div>
  )
}

export default Navbar