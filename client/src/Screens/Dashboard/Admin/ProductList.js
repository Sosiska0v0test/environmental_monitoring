import React, { useEffect } from 'react'
import SideBar from '../SideBar'
import Table from '../../../Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllProductsAction, deleteProductAction, getAllProductsAction } from '../../../Redux/Actions/ProductsActions'
import toast from 'react-hot-toast'
import Loader from '../../../Components/Notification/Loader'
import { Empty } from './../../../Components/Notification/Empty'
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb'
import { FaRegListAlt } from 'react-icons/fa'

function ProductList() {
  const dispatch = useDispatch();
  const sameClass =
    'text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain';

  // all products
  const { isLoading, isError, products, pages, page, totalProducts } = useSelector(
    (state) => state.getAllProducts
  );
  // delete
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteProduct
  );
  // delete all
  const { isLoading: allLoading, isError: allError } = useSelector(
    (state) => state.deleteAllProducts
  );

  // delete product handler
  const deleteProductHandler = (id) => {
    window.confirm('Ви впревнені що хочете видалити цю таблицю?') &&
      dispatch(deleteProductAction(id));
  };

  // delete all products handler
  const deleteAllProductsHandler = () => {
    window.confirm('Ви впревнені що хочете видалити всі таблиці?') &&
      dispatch(deleteAllProductsAction());
  };

  // useEffect
  useEffect(() => {
    dispatch(getAllProductsAction({}));
  }, [dispatch]);

  // error
  useEffect(() => {
    // errors
    if (isError || deleteError || allError) {
      toast.error(isError || deleteError || allError);
    }
  }, [isError, deleteError, allError]);

  // pagination next and pev pages
  const nextPage = () => {
    dispatch(
      getAllProductsAction({
        pageNumber: page + 1,
      })
    );
  };
  const prevPage = () => {
    dispatch(
      getAllProductsAction({
        pageNumber: page - 1,
      })
    );
  };

  // dashboard datas
  const DashboardData = [
    {
      bg: 'bg-pink-600',
      icon: FaRegListAlt,
      title: 'Таблиці',
      total: isLoading ? 'Завантаження...' : totalProducts || 0,
    },
  ]

  return (
    <SideBar>
      <div className='flex flex-col gap-6'>
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
        <div className='flex-btn gap-2'>
          <h2 className='text-xl text-white font-bold'>
            Список таблиць
          </h2>
          { products?.length > 0 && (
            <button
              disabled={ allLoading }
              onClick={ deleteAllProductsHandler }
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-mainText py-3 px-6 rounded"
            >
              { allLoading ? 'Видалення...' : 'Видалити все' }
            </button>
          ) }
        </div>
        { isLoading || deleteLoading ? (
          <Loader />
        ) : products?.length > 0 ? (
          <>
            <Table data={ products } admin={ true } onDeleteHandler={ deleteProductHandler } />
            {/* Loading More */ }
            <div className='w-full flex-rows gap-6 my-5'>
              <button onClick={ prevPage } disabled={ page === 1 } className={ sameClass }>
                <TbPlayerTrackPrev className='text-xl' />
              </button>
              <button onClick={ nextPage } disabled={ page === pages } className={ sameClass }>
                <TbPlayerTrackNext className='text-xl' />
              </button>
            </div>
          </>
        ) : (
          <Empty message='Тут не має таблиць' />
        ) }
      </div>
    </SideBar>
  )
}

export default ProductList