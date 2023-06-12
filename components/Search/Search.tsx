import React, { useState } from 'react'
import {FiSearch} from 'react-icons/fi'

const Search = () => {
  const [input, setInput] = useState('')

  return (
    <div className='wrapper 2xl:absolute 2xl:right-[12%]'>
        <button className='icon'><FiSearch /></button>
        <input type="text" name='text' placeholder='search..' className='input bg-gray-600 h-8 w-8 p-[10px] pr-[22px] rounded-full border-none outline-none'
        value={input} onChange={(e) => setInput(e.target.value)} />
        <span className='input-highlight'></span>
    </div>
  )
}

export default Search