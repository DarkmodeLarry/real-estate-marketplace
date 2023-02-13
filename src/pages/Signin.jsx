import { useState } from 'react'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import SeePassword from '../assets/svg/MonkeySee'
import ArrowRight from '../assets/svg/ArrowRight'

function Signin() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

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
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Invalid User Credentials')
    }
  }

  return (
    <>
      <div className='min-h-screen min-w-full max-w-full bg-gray-100 rounded-xl'>
        <header className='flex max-w-lg items-center justify-center rounded-2xl'>
          <p className='text-3xl text-sky-900 font-bold tracking-wide p-2 mt-16'>
            Welcome Back Player
          </p>
        </header>

        <main className='max-w-lg px-8'>
          <form
            onSubmit={onSubmit}
            className='border-2 border-red-indigo-500 mt-16 shadow-2xl rounded-3xl py-4 px-4 max-w-lg '
          >
            <input
              type='email'
              className='emailInput shadow-xl'
              placeholder='Email'
              id='email'
              value={email}
              onChange={onChange}
            />

            <div className='relative w-full'>
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
            </div>

            <div className='signInBar cursor-pointer flex justify-between text-sky-900 px-8 py-1 bg-sky-100 text-lg items-center shadow-xl rounded-full'>
              <p className='signInText'>Sign In</p>
              <button className='rounded-full'>
                <ArrowRight fill='#000000' className='h-10 w-10 rounded-full' />
              </button>
            </div>

            <Link
              to='/forgotpassword'
              className='mt-4 text-lime-700 text-md font-semibold text-right underline'
            >
              Forgot Password?
            </Link>
          </form>

          <OAuth />

          <Link
            to='/signup'
            className='text-sky-700 w-full flex justify-center items-center text-xl mt-10 font-bold'
          >
            Sign Up Instead
          </Link>
        </main>
      </div>
    </>
  )
}

export default Signin
