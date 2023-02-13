import { RxAvatar } from 'react-icons/rx'
import { BsGrid } from 'react-icons/bs'

function Header() {
  return (
    <header>
      <div className='h-24 min-w-full fixed top-8 flex flex-col items-center justify-center left-0 bg-zinc-600-200'>
        <div className='border-2 w-full justify-between items-center flex pr-8'>
          <div className='w-16 flex justify-center items-center'>
            <BsGrid className='text-white h-10 w-10' />
          </div>
          <div className='border-2 rounded-3xl w-16 flex justify-center items-center'>
            <RxAvatar className='text-white h-16 w-16' />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
