import React from 'react'
import { IoMdPricetags } from "react-icons/io";
import { IoLanguage } from "react-icons/io5";
import { SiMaterialformkdocs } from "react-icons/si";


function FlexProductItems({ product }) {
  return (
    <>
      <div className='flex items-center gap-2'>
        <SiMaterialformkdocs className='text-red-500 w-5 h-5' /> <span className='text-sm font-medium'>{ product.category }</span>
      </div>
      <div className='flex items-center gap-2'>
        <IoMdPricetags className='text-red-500 w-5 h-5' />
        <span className='text-sm font-medium'>{ product.year }</span>
      </div>
      <div className='flex items-center gap-2'>
        <IoLanguage className='text-red-500 w-5 h-5' />
        <span className='text-sm font-medium'>{ product.language }</span>
      </div>
    </>
  )
}

export default FlexProductItems