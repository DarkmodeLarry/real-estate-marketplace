import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getAuth, updateProfile } from 'firebase/auth'
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc
} from 'firebase/firestore'
import { db } from '../firebase.config'
import ListingItem from '../components/ListingItem'
import { toast } from 'react-toastify'
import { TbHome2 } from 'react-icons/tb'
import ArrowRight from '../assets/svg/ArrowRight'

function Profile() {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const { name, email } = formData

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings')

      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )

      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListings(listings)
      setLoading(false)
    }

    fetchUserListings()
  }, [auth.currentUser.uid])

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

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

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete')) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter((listing) => listing.id !== listingId)
      setListings(updatedListings)
      toast.success('Successfully deleted listing')
    }
  }

  return (
    <div className='min-h-full max-w-full mx-12 my-16 p-4 bg-gray-100 rounded-xl'>
      <header className='flex max-w-lg items-center justify-between mb-5 bg-sky-200 rounded-lg p-2 shadow-2xl'>
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
            className=''
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}
          >
            {changeDetails ? (
              <button className='text-[var(--whiteSilver)] bg-gray-400 rounded-lg px-4 py-1 hover:bg-gray-500 transition-all duration-300 ease-out hover:shadow-inner hover:shadow-black'>
                Done
              </button>
            ) : (
              <button className='text-[var(--whiteSilver)] bg-gray-700 rounded-lg px-4 py-1 hover:bg-gray-400 transition-all ease-out duration-300 hover:shadow-inner hover:shadow-black'>
                Change
              </button>
            )}
          </p>
        </div>

        <div className='bg-sky-200 rounded-lg p-4 shadow-xl max-w-lg  my-10'>
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
        <div className='bg-sky-200 rounded-lg p-3 shadow-2xl mt-8'>
          <Link
            to='/createlisting'
            className='createListing bg-sky-300 flex justify-between items-center font-semibold rounded-lg px-3 py-4 hover:shadow-inner hover:shadow-gray-600 hover:text-gray-100 transition-all duration-300'
          >
            <TbHome2 className='h-8 w-8' />
            <p className='text-lg'>Sell or Rent your home</p>
            <ArrowRight className='h-9 w-9' />
          </Link>
        </div>
        {!loading && listings?.length > 0 && (
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
        )}
      </main>
    </div>
  )
}

export default Profile
