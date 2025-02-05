import React, {useState} from 'react'
import Button from './Button';
import { Nunito, Open_Sans } from 'next/font/google';
import { useAuth } from '../context/AuthContext';

const nunito = Nunito({ subsets: ["latin"] });

export default function AboutYou(props) {
  const { phone, password } = props
  const { login } = useAuth()
  const [message, setMessage] = useState('')
  const [isAuth, setIsAuth] = useState(false)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [bio, setBio] = useState('')
  const [social, setSocial] = useState('')
  const errorMsg = document.getElementById('errorMsg')

  errorMsg?.addEventListener('animationend', () => {
    errorMsg.classList.remove('shake')
  })

  async function handleSubmit () {
    if (!firstname || !lastname || !city || !state || !gender || !age || !bio || !social) {
        setMessage("Please fill out all fields...")
        errorMsg?.classList.add('shake')
        return;
    }

    setIsAuth(true)
    
    try {
      const response = await fetch('/api/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, data: {
          firstName: firstname,
          lastName: lastname,
          city: city,
          state: state,
          sex: gender == 'Man' ? true : false,
          age: Number(age),
          bio: bio,
          socialMed: social 
        } }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('User updated:', data.user);
      } else {
        const errorData = await response.json();
        console.error('Failed to update user:', errorData.error);
        setMessage("There was a problem creating your profile...")
        errorMsg?.classList.add('shake')
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage("There was a problem creating your profile...")
      errorMsg?.classList.add('shake')
    } finally {
      setIsAuth(false)
      const loggedIn = await login(phone, password)
      if (loggedIn) {
        console.log("Logging in an existing user")
      } else {
        setMessage("Trouble logging in...")
        errorMsg?.classList.add('shake')
      }
    }
  }

  const states = [
    { name: "Alabama", abbreviation: "AL" },
    { name: "Alaska", abbreviation: "AK" },
    { name: "Arizona", abbreviation: "AZ" },
    { name: "Arkansas", abbreviation: "AR" },
    { name: "California", abbreviation: "CA" },
    { name: "Colorado", abbreviation: "CO" },
    { name: "Connecticut", abbreviation: "CT" },
    { name: "Delaware", abbreviation: "DE" },
    { name: "Florida", abbreviation: "FL" },
    { name: "Georgia", abbreviation: "GA" },
    { name: "Hawaii", abbreviation: "HI" },
    { name: "Idaho", abbreviation: "ID" },
    { name: "Illinois", abbreviation: "IL" },
    { name: "Indiana", abbreviation: "IN" },
    { name: "Iowa", abbreviation: "IA" },
    { name: "Kansas", abbreviation: "KS" },
    { name: "Kentucky", abbreviation: "KY" },
    { name: "Louisiana", abbreviation: "LA" },
    { name: "Maine", abbreviation: "ME" },
    { name: "Maryland", abbreviation: "MD" },
    { name: "Massachusetts", abbreviation: "MA" },
    { name: "Michigan", abbreviation: "MI" },
    { name: "Minnesota", abbreviation: "MN" },
    { name: "Mississippi", abbreviation: "MS" },
    { name: "Missouri", abbreviation: "MO" },
    { name: "Montana", abbreviation: "MT" },
    { name: "Nebraska", abbreviation: "NE" },
    { name: "Nevada", abbreviation: "NV" },
    { name: "New Hampshire", abbreviation: "NH" },
    { name: "New Jersey", abbreviation: "NJ" },
    { name: "New Mexico", abbreviation: "NM" },
    { name: "New York", abbreviation: "NY" },
    { name: "North Carolina", abbreviation: "NC" },
    { name: "North Dakota", abbreviation: "ND" },
    { name: "Ohio", abbreviation: "OH" },
    { name: "Oklahoma", abbreviation: "OK" },
    { name: "Oregon", abbreviation: "OR" },
    { name: "Pennsylvania", abbreviation: "PA" },
    { name: "Rhode Island", abbreviation: "RI" },
    { name: "South Carolina", abbreviation: "SC" },
    { name: "South Dakota", abbreviation: "SD" },
    { name: "Tennessee", abbreviation: "TN" },
    { name: "Texas", abbreviation: "TX" },
    { name: "Utah", abbreviation: "UT" },
    { name: "Vermont", abbreviation: "VT" },
    { name: "Virginia", abbreviation: "VA" },
    { name: "Washington", abbreviation: "WA" },
    { name: "West Virginia", abbreviation: "WV" },
    { name: "Wisconsin", abbreviation: "WI" },
    { name: "Wyoming", abbreviation: "WY" }
  ];

  const genders = [
    "Man",
    "Woman"
  ];

  return (
    <div className='flex flex-col flex-1 items-center gap-5'>
        <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + nunito.className}>Profile Setup</h3>
        <p>Just one more step...</p>
        <div className='w-full mx-auto max-w-[400px] flex flex-col items-center gap-3'>
            <label className='w-full text-left px-3 -mb-2'>Basic</label>
            <input value={firstname} onChange={(e) => {
            setFirstname(e.target.value)
            }} className='w-full max-w-[400px] mx-auto px-5 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-300 rounded-full outline-none' placeholder='First Name' type='text' maxLength={100} />
            <input value={lastname} onChange={(e) => {
            setLastname(e.target.value)
            }} className='w-full max-w-[400px] mx-auto px-5 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-300 rounded-full outline-none' placeholder='Last Name' type='text' maxLength={100} />
            <input value={age} onChange={(e) => {
            setAge(e.target.value)
            }} className='w-full max-w-[400px] mx-auto px-5 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-300 rounded-full outline-none' placeholder='Age' type='number' maxLength={2} />
        
            <select className='w-full max-w-[400px] mx-auto px-5 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-300 rounded-full outline-none' value={gender} onChange={(e) => {
                setGender(e.target.value)
                }} required>
                <option value="">Select a gender</option>
                {genders.map((g) => (
                    <option key={g} value={g}>
                    {g}
                    </option>
                ))}
            </select>
        </div>
        <div className='w-full mx-auto max-w-[400px] flex flex-col items-center gap-3'>
            <label className='w-full text-left px-3 -mb-2'>Location</label>
            <input value={city} onChange={(e) => {
            setCity(e.target.value)
            }} className='w-full max-w-[400px] mx-auto px-5 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-300 rounded-full outline-none' placeholder='City' type='text' maxLength={100} />
            
            <select className='w-full max-w-[400px] mx-auto px-5 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-300 rounded-full outline-none' value={state} onChange={(e) => {
            setState(e.target.value)
            }} required>
                <option value="">Select a state</option>
                {states.map((state) => (
                <option key={state.abbreviation} value={state.abbreviation}>
                    {state.name}
                </option>
                ))}
            </select>
        </div>
        <div className='w-full mx-auto max-w-[400px] flex flex-col items-center gap-3'>
            <label className='w-full text-left px-3 -mb-2'>Instagram</label>
            <input value={social} onChange={(e) => {
            setSocial(e.target.value)
            }} className='w-full max-w-[400px] mx-auto px-5 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-300 rounded-full outline-none' placeholder='Instagram accnt' type='text' maxLength={100} />
        </div>
        <div className='w-full mx-auto max-w-[400px] flex flex-col items-center gap-3'>
            <label className='w-full text-left px-3 -mb-2'>Bio</label>
            <textarea rows={10} value={bio} onChange={(e) => {
                setBio(e.target.value)
            }} className='w-full max-w-[400px] mx-auto px-5 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-300 rounded-2xl outline-none' placeholder='Tell us about yourself (max 500 words)' maxLength={500} />

            <div className='max-w-[400px] w-full mx-auto py-2 sm:py-3'>
                <Button onClick={handleSubmit} text={isAuth? "Submitting..." : "Submit"} full />
            </div>
            <p id="errorMsg" className='text-red-600 text-bold'>{message}</p>
        </div>
    </div>
  );
}
