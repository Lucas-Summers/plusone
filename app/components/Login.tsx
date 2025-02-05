import React, {useState} from 'react'
import Button from './Button';
import { Nunito, Open_Sans } from 'next/font/google';
import { useAuth } from '../context/AuthContext';
import AboutYou from './AboutYou';

const nunito = Nunito({ subsets: ["latin"] });

export default function Login() {
  const [phone, setPhone] = useState('')
  const [formattedPhone, setFormattedPhone] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [message, setMessage] = useState('')
  const [isAuth, setIsAuth] = useState(false)
  const [isSignedUp, setIsSignedUp] = useState(false)
  const { login, signup } = useAuth()
  const errorMsg = document.getElementById('errorMsg')

  errorMsg?.addEventListener('animationend', () => {
    errorMsg.classList.remove('shake')
  })

  async function handleSubmit () {
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters")
      errorMsg?.classList.add('shake')
      return;
    }
    if (phone.length != 10) {
      setMessage("Invalid phone number")
      errorMsg?.classList.add('shake')
      return;
    }

    setIsAuth(true)
    try {
      if (isSignup) {
        const signedUp = await signup(phone, password)
        if (signedUp) {
          console.log("Signing up a new user")
          setIsSignedUp(true)
        } else {
          setMessage("Trouble signing up...")
          errorMsg?.classList.add('shake')
        }
      } else {
        const loggedIn = await login(phone, password)
        if (loggedIn) {
          console.log("Logging in an existing user")
        } else {
          setMessage("Invalid phone # or password")
          errorMsg?.classList.add('shake')
        }
      }
    } catch (err) {
      setMessage("There was a problem signing in...")
      errorMsg?.classList.add('shake')
    } finally {
      setIsAuth(false)
    }

  }

  const handlePhoneNumberChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');  // Remove non-digits
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    setPhone(value)
    if (value.length > 0) {
      if (value.length <= 3) {
        value = `(${value}`;
      } else if (value.length <= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      } else {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}–${value.slice(6, 10)}`;
      }
      setFormattedPhone(value);
    } else {
      setFormattedPhone('')
    }
  };

  if (isSignedUp) {
    return (
      <AboutYou phone={phone} password={password} />
    );
  }

  return (
    <div className='flex flex-col flex-1 items-center gap-5'>
      <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + nunito.className}>{isSignup ? 'Sign Up' : 'Log In'}</h3>
      <p>You&#39;re one step away!</p>
      <input value={formattedPhone} onChange={handlePhoneNumberChange} required className='w-full max-w-[400px] mx-auto px-5 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-300 rounded-full outline-none' placeholder='Phone #' type='text' maxLength={18} />
      <input value={password} onChange={(e) => {
        setPassword(e.target.value)
      }} required className='w-full max-w-[400px] mx-auto px-5 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-300 rounded-full outline-none' placeholder='Password' type='password' maxLength={100} />
      <div className='max-w-[400px] w-full mx-auto'>
        <Button onClick={handleSubmit} text={isAuth? "Submitting..." : "Submit"} full />
      </div>
      <p id='errorMsg' className='text-red-600 text-bold'>{message}</p> 
      <p className='text-center'>{isSignup ? 'Already have an account?' : 'Don\'t have an account?'} <button onClick={() => setIsSignup(!isSignup)} className='text-indigo-600'>{isSignup ? 'Sign in' : 'Sign up'}</button></p>
    </div>
  );
}
