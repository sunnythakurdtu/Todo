import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-violet-900 p-2">
        <div className="logo text-xl font-bold mx-9">
            <span>iTask</span>
        </div>
        <ul className="flex gap-9 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-75'>Your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
