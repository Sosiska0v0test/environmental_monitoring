import React from 'react'
import { BsFillGridFill } from 'react-icons/bs'
import { FaListAlt, FaUsers } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { RiLockPasswordLine, RiLogoutCircleLine } from 'react-icons/ri'
import { HiViewGridAdd } from 'react-icons/hi'
import Layout from '../../Layout/Layout'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../../Redux/Actions/userActions'
import toast from 'react-hot-toast'
import { IoMdAdd } from "react-icons/io";

function SideBar({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);

  // logout function 
  const logOutHandler = () => {
    dispatch(logoutAction())
    toast.success("Ви вийшли!")
    navigate('/login')
  }

  const SideLink =
    userInfo?.isAdmin ?
      [
        {
          name: 'Панель керування',
          link: '/dashboard',
          icon: BsFillGridFill,
        },
        {
          name: 'Таблиці',
          link: '/productslist',
          icon: FaListAlt,
        },
        {
          name: 'Додати таблицю',
          link: '/addproduct',
          icon: IoMdAdd,
        },
        {
          name: "Об'єкти",
          link: '/categories',
          icon: HiViewGridAdd,
        },
        {
          name: 'Користувачі',
          link: '/users',
          icon: FaUsers,
        },
        {
          name: 'Редагувати профіль',
          link: '/profile',
          icon: FiSettings,
        },
        {
          name: 'Змінити пароль',
          link: '/password',
          icon: RiLockPasswordLine,
        },
      ] : userInfo ? [
        {
          name: 'Редагувати профіль',
          link: '/profile',
          icon: FiSettings,
        },
        {
          name: 'Змінити пароль',
          link: '/password',
          icon: RiLockPasswordLine,
        },
      ] : [];

  const active = 'bg-subMain text-white'
  const hover = 'hover:text-mainText hover:bg-main'
  const inActive = 'rounded font-semibold text-sm transitions flex gap-3 items-center p-4'
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`


  return (
    <Layout>
      <div className='min-h-screen container mx-auto px-2'>
        <div className='xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6'>
          <div className='col-span-2 sticky text-main bg-dry border border-main p-6 rounded-md xl:mb-0 mb-5'>
            {
              //SideBar Link
              SideLink.map((link, index) => (
                <NavLink to={ link.link } key={ index } className={ Hover }>
                  <link.icon /> <p>{ link.name }</p>
                </NavLink>
              ))
            }
            <button onClick={ logOutHandler } className={ `${inActive} ${hover} w-full` }>
              <RiLogoutCircleLine /> Вийти
            </button>
          </div>
          <div
            data-aos='fade-up'
            data-aos-duration='1000'
            data-aos-delay='10'
            data-aos-offset='200'
            className='col-span-6 rounded-md bg-dry border border-main p-6'>
            { children }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SideBar