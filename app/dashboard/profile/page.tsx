"use client"
import React, { useEffect, useState } from 'react'
import {useAuth} from '../../context/AuthContext';
import Button from '../../components/Button.tsx'

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [message, setMessage] = useState('')
  const [firstname, setFirstname] = useState(user.firstName)
  const [lastname, setLastname] = useState(user.lastName)
  const [city, setCity] = useState(user.city)
  const [state, setState] = useState(user.state)
  const [gender, setGender] = useState(user.sex ? "Man" : "Woman")
  const [age, setAge] = useState(user.age)
  const [bio, setBio] = useState(user.bio)
  const [social, setSocial] = useState(user.socialMed)
  const [premium, setPremium] = useState(user.premium)
  const [pubpriv, setPubPriv] = useState(user.banned)
  const errorMsg = document.getElementById('errorMsg')
  errorMsg?.addEventListener('animationend', () => {
    errorMsg.classList.remove('shake')
  })
  const [isUpdated, setisUpdated] = useState(false)

  async function handleUpdate () {
    if (!firstname || !lastname || !city || !state || !gender || !age || !bio || !social) {
        setMessage("Please fill out all fields...")
        errorMsg?.classList.add('shake')
        return;
    }
    try {
      const response = await fetch('/api/updateUserProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id, data: {
          firstName: firstname,
          lastName: lastname,
          city: city,
          state: state,
          sex: gender == 'Man' ? true : false,
          age: Number(age),
          bio: bio,
          premium: premium,
          banned: pubpriv,
          socialMed: social
        } }),
      });
  
      if (response.ok) {
      	const data = await response.json();
      	console.log('User updated:', data.user);
        const updatedUser = { ...user, firstName: firstname, lastName: lastname, city: city, state: state, sex: gender, age: age, bio: bio, socialMed: social, premium: premium, banned: pubpriv };
        setUser(updatedUser); // Update user in context
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
            const errorData = await response.json();
            console.error('Failed to update user:', errorData.error);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage("There was a problem updating your profile...")
      errorMsg?.classList.add('shake')
    } finally {
      setisUpdated(true)
    }
  }

  function handlePremium () {
    setPremium(prev => !prev)
    handleUpdate()
  }

  function handlePubPriv () {
    setPubPriv(prev => !prev)
    handleUpdate()
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
        <div className='flex flex-col items-center'>
          <img src='https://cdn-icons-png.flaticon.com/512/10061/10061438.png' alt={user.firstName+" "+user.lastName} className="w-60 h-60 rounded-full" />
          <button
            onClick={handlePremium}
            className="h-10 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition mb-3"
          >
            {premium ? "Get Plus+ Premium" : "Get Plus+ Free"}
          </button>
          <button
            onClick={handlePubPriv}
            className="h-10 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            {pubpriv ? "Go private" :  "Go public"}
          </button>
        </div>
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
              <Button onClick={handleUpdate} text="Update" full />
          </div>
          <p id="errorMsg" className='text-red-600 text-bold'>{message}</p>
          <p>{(isUpdated ? "Profile successfully updated..." : "")}</p>
      </div>
  </div>

  );
}
