import { PuffLoader } from "react-spinners";

function Loader() {
  return (
    <div className='w-full py-4 px-2 flex-colo'>
      <PuffLoader color="#D66BA0" />
    </div>
  )
}

export default Loader;