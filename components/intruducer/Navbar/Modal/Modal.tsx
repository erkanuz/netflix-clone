import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Login from './login'

import {AiOutlineCloseCircle} from 'react-icons/ai'
import { Toaster } from 'react-hot-toast';

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    bgcolor: 'black',
  };

  return (
    <div>
      <Toaster />
      <button className='sm:bg-black bg-red-600 text-white px-5 py-1 rounded-md hover:scale-110 duration-300 ' onClick={handleOpen}>Sign In</button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button className='absolute top-5 right-5' onClick={handleClose}><AiOutlineCloseCircle size={25} /></button>
          <Login />
        </Box>
      </Modal>
    </div>
  );
}