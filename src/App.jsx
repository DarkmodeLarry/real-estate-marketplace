import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
// import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Offers from './pages/Offers'
import Explore from './pages/Explore'
import Favorites from './pages/Favorites'
import Category from './pages/Category'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import CreateListing from './pages/CreateListing'
import EditListing from './pages/EditListing'
import Listing from './pages/Listing'
import Contact from './pages/Contact'

function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/createlisting' element={<CreateListing />} />
          <Route path='/editlisting/:listingId' element={<EditListing />} />

          <Route path='/category/:categoryName/listingId' element={<Listing />} />

          <Route path='/contact/:landlordId' element={<Contact />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>

        <Navbar />
      </Router>

      <ToastContainer />
    </>
  )
}

export default App
