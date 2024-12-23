import React from 'react';
import {Link} from 'react-router-dom';
const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-10">
        Sign Up
      </h1>
      <form className='flex flex-col gap-4'>
          <input type="text" placeholder='Username' className='border p-3 rounded-lg' id='username'/>
          <input type="text" placeholder='Email' className='border p-3 rounded-lg' id='email'/>
          <input type="text" placeholder='Password' className='border p-3 rounded-lg' id='password'/>
          <button className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-80 disabled:opacity-60'>Sign Up</button>
      </form>
      <div className="flex gap-3 mt-3">
        <p>Have an account?</p>
        <Link to={'/signin'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp