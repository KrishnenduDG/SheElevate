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
        <img 
          src={"/images/logo.png"}
          alt='Logo'
          height={40}
        />
        
      </div>
      <div>
        <div className='modal-container'>
          <Modal isOpen={isOpen}/>
          <HiMenu
            className='Himenu'
            onClick={toggleModal}
            height={100}
          />
        </div>
      </div>
    </div>
  )
}

export default Navbar