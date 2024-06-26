// src/components/Toolbar.jsx
import DownloadIcon from '@/components/common/icons/download.icon';
import DupplicateIcon from '@/components/common/icons/dupplicate.icon';
import FullScreenIcon from '@/components/common/icons/full-screen.icon';
import MinusIcon from '@/components/common/icons/minus.icon';
import PlusIcon from '@/components/common/icons/plus.icon';
import RedoIcon from '@/components/common/icons/redo.icon';
import ThreeDotsIcon from '@/components/common/icons/three-dots.icon';
import UndoIcon from '@/components/common/icons/undo.icon';
import { Button, TextField } from '@mui/material';
import React from 'react';

export default function Toolbar({ onZoomIn, onZoomOut, onUndo, onRedo }) {
  return (
    <div className='tw-w-[95%] tw-mx-5 tw-fixed tw-top-5 tw-z-10 tw-h-12 tw-gap-0 tw-justify-between  tw-flex'>
      <div className='left-items tw-flex  tw-min-w-[410px] tw-h-12 tw-gap-[19px]  tw-border tw-shadow-[0px_0px_17px_0px_#0000000F] tw-bg-white tw-px-4 tw-py-3 tw-rounded-[8px] tw-border-[0px_0px] tw-border-solid tw-border-[#D0D5DD]'>
        <div className='tw-text-base tw-font-medium tw-leading-6 tw-text-left tw-text-[#475467] tw-border-r-[#CDCCD7] tw-border-r tw-border-solid tw-pr-4'>
          Mahontech
        </div>
        <div className=' tw-border-r-[#CDCCD7] tw-border-r tw-border-solid tw-pr-4'>
          {/* <TextField label='Untitled' variant='standard' /> */}
          <input
            type='text'
            className='tw-outline-none tw-w-[100px]'
            placeholder='Untitled'
          />
        </div>
        <div className='hover:tw-cursor-pointer'>
          <DownloadIcon />
        </div>
        <div className='hover:tw-cursor-pointer'>
          <DupplicateIcon />
        </div>
        <div className='hover:tw-cursor-pointer'>
          <FullScreenIcon />
        </div>
        <div className='hover:tw-cursor-pointer'>
          <ThreeDotsIcon />
        </div>
      </div>
      <div className='right-items tw-flex tw-gap-4'>
        <div className='  tw-h-12 tw-gap-[19px]   tw-border tw-shadow-[0px_0px_17px_0px_#0000000F] tw-bg-white tw-px-4 tw-py-3 tw-rounded-[8px] tw-border-[0px_0px] tw-border-solid tw-border-[#D0D5DD]'>
          <div className=' tw-flex tw-gap-4'>
            <div className='hover:tw-cursor-pointer'>
              <RedoIcon />
            </div>
            <div className='hover:tw-cursor-pointer'>
              <UndoIcon />
            </div>
          </div>
        </div>
        <div className='  tw-flex tw-items-center tw-h-12 tw-gap-[19px]   tw-border tw-shadow-[0px_0px_17px_0px_#0000000F] tw-bg-white tw-px-4 tw-py-3 tw-rounded-[8px] tw-border-[0px_0px] tw-border-solid tw-border-[#D0D5DD]'>
          <div className='hover:tw-cursor-pointer'>
            <MinusIcon />
          </div>
          <div className='hover:tw-cursor-pointer tw-text-base tw-font-medium tw-leading-6 tw-text-left tw-text-[#475467]'>
            100%
          </div>
          <div className='hover:tw-cursor-pointer'>
            <PlusIcon />
          </div>
          <div className='hover:tw-cursor-pointer tw-text-base tw-font-medium tw-leading-6 tw-text-left tw-text-[#475467]'>
            {' '}
            Discard
          </div>
          <div className='hover:tw-cursor-pointer tw-w-[72px] tw-h-[34px] tw-gap-2.5  tw-bg-[#021133] tw-text-base tw-font-medium tw-leading-6 tw-text-left tw-text-white tw-px-4 tw-py-1 tw-rounded-[6px]'>
            Save
          </div>
        </div>
      </div>
    </div>
  );
}
