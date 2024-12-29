import React from 'react'

function Product({ product }) {


  return (
    <>
      <div className='p-3 bg-main rounded-lg hover:scale-95 transitions relative overflow-hidden'>
        <div className='absolute flex-btn gap-2 bottom-0 right-0 left-2 bg-main bg-opacity-60 text-mainText px-10 py-5'>
          <h3 className='font-semibold truncate'>{ product?.name }</h3>
        </div>
      </div>
    </>
  )
}

export default Product
