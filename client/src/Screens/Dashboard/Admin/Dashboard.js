import React, { useEffect } from 'react'
import SideBar from '../SideBar'
import { FaRegListAlt, FaUser } from 'react-icons/fa'
import { HiViewGridAdd } from 'react-icons/hi'
import Table from '../../../Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductAction } from '../../../Redux/Actions/ProductsActions'
import { getAllUsersAction } from '../../../Redux/Actions/userActions'
import toast from 'react-hot-toast'
import Loader from '../../../Components/Notification/Loader'
import { Empty } from '../../../Components/Notification/Empty'

function Dashboard() {
  const dispatch = useDispatch();
  // useSelectors
  const {
    isLoading: catLoading,
    isError: catError,
    categories,
  } = useSelector((state) => state.categoryGetAll);
  const {
    isLoading: userLoading,
    isError: userError,
    users,
  } = useSelector((state) => state.adminGetAllUsers);

  const { isLoading, isError, products, totalProducts } = useSelector(
    (state) => state.getAllProducts
  );

  // delete
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteProduct
  );

  // delete product handler
  const deleteProductHandler = (id) => {
    window.confirm('Are you sure you want do delete this product?') &&
      dispatch(deleteProductAction(id));
  };

  // useEffect
  useEffect(() => {
    // get all users
    dispatch(getAllUsersAction());
  }, [dispatch]);

  // useEffect
  useEffect(() => {
    // errors
    if (isError || catError || userError || deleteError) {
      toast.error('Щось пішло не так!');
    }
  }, [isError, catError, userError, deleteError]);

  // dashboard datas
  const DashboardData = [
    {
      bg: 'bg-pink-600',
      icon: FaRegListAlt,
      title: 'Таблиці',
      total: isLoading ? 'Loading...' : totalProducts || 0,
    },
    {
      bg: 'bg-green-600',
      icon: HiViewGridAdd,
      title: "Об'єкти",
      total: catLoading ? 'Loading...' : categories?.length || 0,
    },
    {
      bg: 'bg-blue-700',
      icon: FaUser,
      title: 'Юзери',
      total: userLoading ? 'Loading..' : users?.length || 0,
    },
  ]
  return (
    <SideBar>
      <h2 className='text-xl font-bold text-main'>Панель керування</h2>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
        { DashboardData.map((data, index) => (
          <div key={ index } className='p-4 pr-16 rounded bg-main border-border grid grid-cols-4 gap-2'>
            <div className={ `col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}` }>
              <data.icon />
            </div>
            <div className='col-span-3 text-center'>
              <h2>{ data.title }</h2>
              <p className='mt-2 text-center font-bold'>{ data.total }</p>
            </div>
          </div>
        )) }
      </div>
      <h3 className='text-md font-medium italic my-6 text-border'>Останні додані таблиці</h3>
      { isLoading || deleteLoading ? (
        <Loader />
      ) : products.length > 0 ? (
        <Table
          data={ products?.slice(0, 5) }
          admin={ true }
          onDeleteHandler={ deleteProductHandler }
        />
      ) : (
        <Empty message="Порожньо" />
      ) }
    </SideBar>
  )
}

export default Dashboard