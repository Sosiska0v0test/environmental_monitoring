import React from 'react';
import Titles from '../Titles';
import { BsCollectionFill } from 'react-icons/bs';
import Product from '../Product';
import Loader from '../Notification/Loader';
import Empty from '../Notification/Loader';


function PopularProducts({ isLoading, products }) {
  return (
    <div className='my-16'>
      <Titles title="Популярні" Icon={ BsCollectionFill } />
      {
        isLoading ? <Loader /> : products?.length > 0 ? (
          <div className='grid sm:mt-12 mt-7 xl:grid-cols-5 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-3 h-86 w-full'>
            {
              products?.slice(0, 8).map((product, index) => (
                <Product key={ index } product={ product } />
              ))
            }
          </div>
        ) : (
          <div className='mt-6'>
            <Empty message="На цьому сайті не має таблиць" />
          </div>
        )
      }

    </div>
  )
}

export default PopularProducts
