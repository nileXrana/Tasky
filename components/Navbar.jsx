import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-violet-800 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>Tasky</span>
        </div>
      <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        
      </ul>
    </nav>
  )
}

export default Navbar
