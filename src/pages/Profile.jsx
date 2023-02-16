import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, updateProfile } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import { TbHome2 } from 'react-icons/tb'
import ArrowRight from '../assets/svg/ArrowRight'
import homeIcon from '../assets/svg/homeIcon.svg'

function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const { name, email } = formData

  const navigate = useNavigate()

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('Could not update profile details')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }
  return (
    <div className='profile min-h-full max-w-full mx-12 my-16 p-4 bg-gray-100 rounded-xl'>
      <header className='profileHeader flex max-w-lg items-center justify-between mb-5 bg-sky-200 rounded-lg p-2 shadow-2xl'>
        <p className='pageHeader text-3xl font-bold tracking-wide p-2'>My Profile</p>
        <button
          className='cursor-pointer font-base font-bold px-3 py-1 bg-sky-600 text-[#F2F2F2] rounded-lg'
          type='button'
          onClick={onLogout}
        >
          Logout
        </button>
      </header>

      <main className='max-w-lg '>
        <div className='profileDetailHeader flex gap-5 items-center max-w-md bg-sky-200 rounded-lg p-3 shadow-lg  text-gray-600'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}
          >
            {changeDetails ? (
              <button className='text-[var(--whiteSilver)] bg-gray-400 rounded-lg px-4 py-1'>
                Done
              </button>
            ) : (
              <button className='text-[var(--whiteSilver)] bg-gray-700 rounded-lg px-4 py-1 hover:bg-gray-400 transition-all ease-out duration-300 hover:shadow-inner hover:shadow-black'>
                Change
              </button>
            )}
          </p>
        </div>

        <div className='profileCard '>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type='email'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>

        <Link to='/createlisting' className='createListing'>
          <img src={homeIcon} alt='home' />
          <p className='text-lg'>Sell or Rent your home</p>
          <ArrowRight className='h-9 w-9' alt='arrow right' />
        </Link>

        {/* {!loading && listings?.length > 0 && (
          <>
            <p className='listingsList'>Your Listings</p>
            <ul className='listingsList'>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )} */}
      </main>
    </div>
  )
}

export default Profile
