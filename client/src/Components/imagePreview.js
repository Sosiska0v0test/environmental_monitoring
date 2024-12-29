

export const ImagePreview = ({ image, name }) => {
  return (
    <div className="w-86 mt-2 h-86 p-2 bg-main rounded">
      <img src={ image ? image : '/images/user.jpg' } alt={ name } className='w-full h-full object-cover rounded' />
    </div>
  )
}