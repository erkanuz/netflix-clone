import React, { useState, useEffect } from 'react'

import Image from 'next/image'

import {AiOutlineUser, AiFillCloseCircle, AiOutlineHeart} from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'
import {CiLogout} from 'react-icons/ci'
import {IoSettingsSharp} from 'react-icons/io5'

import Search from '../Search/Search'
import useAuth from '@/hooks/useAuth'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Avatar, Badge } from '@mui/material'
import useList from '@/hooks/useList'

const x = [
  {
    id: 1,
    text: "HOME",
    link: '/',
  },
  {
    id: 2,
    text: "MOVIES",
    link: '/route/movies',
  },
  {
    id: 3,
    text: "TV SHOWS",
    link: '/route/tv',
  },
  {
    id: 4,
    text: "MY LIST",
    link: '/route/favs',
  },
]

export const Navbar = () => {
  const [nav, setNav] = useState(false)
  const { logout } = useAuth()
  const { user } = useAuth()
  const list = useList(user?.uid)

  const handleNav = () => {
    setNav(!nav)
  };

  const [color, setColor] = useState('transparent');
  useEffect(() => {
    const changeColor = () => {
      window.scrollY > 0 ? setColor('#030712') : setColor('transparent')
    };
    window.addEventListener('scroll', changeColor);
  }, []);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ backgroundColor: `${color}` }} className='fixed left-0 top-0 w-full z-20 ease-in duration-300 p-4 sm:p-2'>
      <nav className='max-w-[1650px] m-auto flex justify-between items-center'>
        <div className='sm:flex hidden items-center gap-6'>
          <Image src={'/logos/netflixs.svg'} alt={''} width={100} height={100} className='hidden sm:block cursor-pointer object-contain w-auto h-auto' />

          <div className='hidden sm:flex mr-0 text-white md:text-sm lg:text-base'>
            {
              x.map((e) => {
                return (
                  <ul className='p-4 font-bold cursor-pointer hover:scale-110 transition-all' key={e.id}>
                    <li><a href={e.link}>{e.text}</a></li>
                  </ul>
                )
              })
            }
          </div>
        </div>

        {/* Mobile Button */}
        <div onClick={handleNav} className='sm:hidden z-20'>
          {nav ?
            <button className='grid place-content-center w-8 h-8 rounded-full bg-gray-600'><AiFillCloseCircle size={30} /></button>
            :
            <button className='grid place-content-center w-8 h-8 rounded-full bg-gray-600'><GiHamburgerMenu /></button>
          }
        </div>
        {/* Mobile Menu */}
        <div className={
          nav
            ?
            'sm:hidden text-white bg-black absolute inset-0 flex justify-center items-center w-full h-screen text-center ease-in duration-300 z-10'
            :
            'sm:hidden text-white bg-black absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen text-center ease-in duration-300'
        }>

          <div>
            {
              x.map((e) => {
                return (
                  <ul className='p-4 cursor-pointer' key={e.id}>
                    <li><a href={e.link}>{e.text}</a></li>
                  </ul>
                )
              })
            }
          </div>
        </div>

        <div className='flex gap-4'>
          <Search />

          <Badge badgeContent={list.length} color="primary" showZero id="basic-button" overlap="circular">
            <button className='grid place-content-center w-8 h-8 rounded-full bg-gray-600'><AiOutlineHeart /></button>
          </Badge>

          <button className='grid place-content-center w-8 h-8 rounded-full bg-gray-600'
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}><AiOutlineUser /></button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}> <Avatar /> {user ? user.email : 'Profile'}</MenuItem>
            <MenuItem onClick={handleClose}><ListItemIcon><IoSettingsSharp /></ListItemIcon>My account</MenuItem>
            <MenuItem onClick={logout}><ListItemIcon><CiLogout /></ListItemIcon>Logout</MenuItem>
          </Menu>

        </div>
      </nav>
    </div>
  )
}