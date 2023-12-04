import React from 'react'
import { useSelector } from 'react-redux'

import { useRef } from 'react';

import { useState } from 'react';


const Profile = () => {

  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);

  // firebase image upload storage code 
  // allow read;
  // allow write : if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl my-7 font-semibold'>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} src={currentUser.avatar} className='mt-2 self-center w-24 h-24 object-cover rounded-full cursor-pointer' alt="" />
        <input
          type="text"
          placeholder='Username'
          id='username'
          className='border p-3 rounded-lg'
        />
        <input
          type="text"
          placeholder='Email'
          id='email'
          className='border p-3 rounded-lg'
        />
        <input
          type="text"
          placeholder='Password'
          id='password'
          className='border p-3 rounded-lg'
        />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}

export default Profile