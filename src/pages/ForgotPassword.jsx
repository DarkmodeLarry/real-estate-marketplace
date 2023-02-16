import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowRight from '../assets/svg/ArrowRight'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const onChange = (e) => setEmail(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email sent!')
    } catch (error) {
      toast.error('Could not send reset link, please try again or contact us!')
    }
  }
  return (
    <div className='min-h-screen max-w-full flex flex-col'>
      <div className='max-w-lg flex flex-col justify-center items-center border-2 rounded-lg  p-4 mx-6 my-32'>
        <header className='w-full flex items-center text-2xl font-bold px-4 pt-4'>
          <h1 className=''>Forgot Password</h1>
        </header>

        <main className='w-full py-4 px-4'>
          <form onSubmit={onSubmit}>
            <input
              type='email'
              className='emailInput rounded-xl'
              placeholder='Enter your email address'
              id='email'
              value={email}
              onChange={onChange}
            />

            <div className='w-full flex justify-between items-center mb-4'>
              <button className='flex justify-center gap-2 px-3 py-2 items-center w-[45%] rounded-xl border-2 shadow-lg bg-gray-200 my-2'>
                <span className=''>Send Reset Link</span>
                <ArrowRight className='h-7 w-7' />
              </button>
              <span>or </span>
              <div>
                <Link className='px-2 py-1 text-sm' to='/signin'>
                  Sign In Instead
                </Link>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default ForgotPassword
