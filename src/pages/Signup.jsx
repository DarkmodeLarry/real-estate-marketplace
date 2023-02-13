import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import OAuth from '../components/OAuth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import SeePassword from '../assets/svg/MonkeySee'
import ArrowRight from '../assets/svg/ArrowRight'

function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const { name, email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: name
      })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error('Error with registration')
    }
  }

  return (
    <>
      <div className='pageContainer p-10 mb-40  border-2 border-indigo-700'>
        <header>
          <p>Hey.....?</p>
          <p>What's your name again?</p>
        </header>

        <form onSubmit={onSubmit} className='gap-4'>
          <input
            type='text'
            className='nameInput'
            placeholder='Full Name'
            id='name'
            value={name}
            onChange={onChange}
          />

          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='passwordInput shadow-xl'
              id='password'
              placeholder='Password'
              value={password}
              onChange={onChange}
            />
            <SeePassword
              alt='show password'
              className='showPassword cursor-pointer absolute top-6 right-5 h-7 w-7'
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
            d
          </div>

          <div className='relative flex flex-col justify-center items-center w-full h-44'>
            <div className='rounded-full border-2 w-40 h-40 absolute bg-red-700 left-auto right-auto -bottom-0.5 -z-10 '>
              Click to Sign Up
            </div>
            <button className='rounded-full bg-red-600 w-40 h-40 absolute right-20 bottom-2 left-auto flex flex-col justify-center items-center border-red-800 shadow-2xl'>
              <ArrowRight className='w-9 h-9' />
            </button>
          </div>
          <Link
            to='/forgotpassword'
            className='pr-5 mt-8 text-sm font-semibold text-right text-indigo-500'
          >
            Forgot Password?
          </Link>
        </form>

        <OAuth />

        <Link to='/signin' className='mt-12 font-bold text-center mb-12'>
          Sign In Instead
        </Link>
      </div>
    </>
  )
}

export default Signup
