import { useNavigate, useLocation } from 'react-router-dom'
import { RiHome6Line } from 'react-icons/ri'
import { FaRegUser } from 'react-icons/fa'
import { MdOutlineNavigation } from 'react-icons/md'
import { BsFillBookmarkHeartFill } from 'react-icons/bs'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }

  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <li className='navbarListItem' onClick={() => navigate('/')}>
            <RiHome6Line
              fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'}
              width='36px'
              height='36px'
            />
            <p className={pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>
              Explore
            </p>
          </li>
          <li className='navbarListItem' onClick={() => navigate('/favorites')}>
            <BsFillBookmarkHeartFill
              fill={pathMatchRoute('/favorites') ? '#2c2c2c' : '#8f8f8f'}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute('/favorites') ? 'navbarListItemNameActive' : 'navbarListItemName'
              }
            >
              Favorites
            </p>
          </li>

          <li className='navbarListItem' onClick={() => navigate('/')}>
            <MdOutlineNavigation
              fill={pathMatchRoute('/offers') ? '#2c2c2c' : '#8f8f8f'}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute('/offers') ? 'navbarListItemNameActive' : 'navbarListItemName'
              }
            >
              Offers
            </p>
          </li>
          <li className='navbarListItem' onClick={() => navigate('/profile')}>
            <FaRegUser
              className='h-8 w-8'
              fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName'
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Navbar
