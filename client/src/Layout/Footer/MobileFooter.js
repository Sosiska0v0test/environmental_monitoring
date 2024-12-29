import React from 'react'
import { NavLink } from 'react-router-dom'
import { BiPhoneCall } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { FaListAlt } from "react-icons/fa";

function MobileFooter() {
  const active = 'bg-main text-mainText'
  const inActive = 'transitions text-2xl flex-colo hover:bg-subMain hover:text-white rounded-md px-4 py-3'
  const Hover = ({ isActive }) => isActive ? `${active} ${inActive}` : inActive
  return (
    <>
      <footer className='lg:hidden text-white fixed z-50 bottom-0 w-full px-1'>
        <div className='bg-subMain rounded-md flex-btn w-full p-1'>
          <NavLink to='/products' className={ Hover }>
            <FaListAlt />
          </NavLink>
          <NavLink to='/login' className={ Hover }>
            <AiFillHome />
          </NavLink>
          <NavLink to='/contact-us' className={ Hover }>
            <BiPhoneCall />
          </NavLink>
        </div>
      </footer>
    </>
  )
}

export default MobileFooter
