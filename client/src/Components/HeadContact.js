import React from 'react'

function HeadContact({ title }) {
  return (
    <div className='w-full bg-deepGray lg:h-96 h-40 relative overflow-hidden rounded-md'>
      <img src='/images/contact.jpg' alt='aboutus' className='w-full h-full object-cover border-5 border-main opacity-70' />
      <div className='absolute lg:top-36 top-16 mt-5 left-16 flex-colo'>
        <h1 className='text-3xl lg:text-h1 text-white text-center font-bold'>
          { title && title }
        </h1>
      </div>
    </div>
  )
}

export default HeadContact