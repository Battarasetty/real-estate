import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between max-w-6xl m-auto items-center p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>Harish</span>
                        <span className='text-slate-700'>Estate</span>
                    </h1>
                </Link>
                <form className='flex items-center bg-slate-100 p-3 rounded-lg'>
                    <input type="text" placeholder='Search..' className='focus:outline-none bg-transparent w-24 sm:w-64' />
                    <FaSearch className='text-slate-600' />
                </form>
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                    </Link>
                    <Link to='/sign-in'>
                        <li className='text-slate-700 hover:underline'>Sign In</li>
                    </Link>

                </ul>
            </div>
        </header>
    )
}

export default Header