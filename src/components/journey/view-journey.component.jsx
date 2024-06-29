import React, { useState } from 'react';
import dayjs from 'dayjs';
import Toolbar from './components/toolbar/toolbar.component';
import ToolsSidebar from './components/tool-sidebar/tools-sidebar.component';
import Canvas from './components/canvas/canvas.component';
import Sidebar from '../common/layout/sidebar/sidebar.component';
import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTheme } from '@emotion/react';

// popup
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default function ViewJourney() {
  const [personName, setPersonName] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const mergePopUpHandler = () => {
    setShowPopup(true);
  };
  const mergePopUpCloseHandler = () => {
    setShowPopup(false);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Toolbar />

        <div style={{ display: 'flex', height: '100%', position: 'relative' }}>
          <Sidebar />
          <Canvas />
          <ToolsSidebar mergePopUpHandler={mergePopUpHandler} />
        </div>
        {false && (
          <div className='tw-absolute tw-top-[20%] tw-right-[10%]'>
            <div className=' tw-w-[817px] tw-bg-white tw-h-[410px] tw-gap-0 tw-border tw-shadow-[0px_0px_10px_0px_#0000001F] tw-rounded-xl tw-border-solid tw-border-[#D0D5DD] tw-left-[509px] tw-top-[140px]'>
              <div className='tw-h-12 tw-px-5 tw-flex tw-items-center tw-justify-between tw-rounded-[12px_12px_0px_0px] tw-bg-[#021133] tw-pl-5 tw-pr-[20px,] tw-py-[12px,]'>
                <div className='tw-flex tw-items-center tw-gap-5'>
                  <div>
                    <svg
                      width='21'
                      height='14'
                      viewBox='0 0 21 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M20.565 6.48753L17.035 2.47787C16.9759 2.41112 16.9057 2.35817 16.8285 2.32205C16.7513 2.28593 16.6686 2.26733 16.585 2.26733C16.5014 2.26733 16.4187 2.28593 16.3415 2.32205C16.2642 2.35817 16.1941 2.41112 16.135 2.47787C16.0759 2.54461 16.029 2.62385 15.997 2.71106C15.9651 2.79827 15.9486 2.89174 15.9486 2.98613C15.9486 3.08053 15.9651 3.174 15.997 3.26121C16.029 3.34841 16.0759 3.42765 16.135 3.4944L18.585 6.26163L11.805 6.26163L8.405 1.66464C8.14867 1.31245 7.82661 1.02858 7.46185 0.833327C7.0971 0.638072 6.69865 0.536256 6.295 0.535156L1.385 0.535156C1.21659 0.535156 1.05507 0.61072 0.935987 0.745225C0.816901 0.87973 0.75 1.06216 0.75 1.25238C0.75 1.4426 0.816901 1.62502 0.935987 1.75953C1.05507 1.89403 1.21659 1.9696 1.385 1.9696L6.285 1.9696C6.50227 1.96875 6.71705 2.02194 6.91407 2.1254C7.11109 2.22886 7.28553 2.38004 7.425 2.56822L10.685 6.99579L7.425 11.4121C7.28553 11.6002 7.11109 11.7514 6.91407 11.8549C6.71705 11.9584 6.50227 12.0115 6.285 12.0107L1.385 12.0107C1.21659 12.0107 1.05507 12.0863 0.935987 12.2208C0.816901 12.3553 0.75 12.5377 0.75 12.7279C0.75 12.9181 0.816901 13.1006 0.935987 13.2351C1.05507 13.3696 1.21659 13.4451 1.385 13.4451L6.285 13.4451C6.68865 13.444 7.08709 13.3422 7.45185 13.147C7.81661 12.9517 8.13867 12.6678 8.395 12.3157L11.755 7.71866L18.545 7.71866L16.095 10.4859C15.9756 10.6207 15.9086 10.8035 15.9086 10.9942C15.9086 11.1848 15.9756 11.3676 16.095 11.5024C16.2143 11.6372 16.3762 11.713 16.545 11.713C16.7138 11.713 16.8756 11.6372 16.995 11.5024L20.525 7.51536C20.5891 7.45204 20.6411 7.37471 20.678 7.28804C20.7148 7.20137 20.7358 7.10716 20.7395 7.0111C20.7433 6.91504 20.7297 6.81912 20.6997 6.72913C20.6697 6.63914 20.6239 6.55695 20.565 6.48753Z'
                        fill='#EDEDED'
                      />
                    </svg>
                  </div>
                  <div className='tw-text-base tw-font-medium tw-leading-6 tw-text-left tw-text-white'>
                    Merge
                  </div>
                </div>
                <div
                  onClick={() => mergePopUpCloseHandler()}
                  className='hover:tw-cursor-pointer'
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M18 6L6 18M6 6L18 18'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </div>
              </div>
              <div className='content tw-p-4 tw-flex tw-flex-col tw-gap-4'>
                <div className='tw-text-base tw-font-medium tw-leading-6 tw-text-left tw-text-black'>
                  Schedule Merge
                </div>
                <div className='tw-flex tw-gap-4 tw-items-center'>
                  <div className='tw-text-base tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                    Wait Period
                  </div>
                  <div>
                    <TextField
                      className='tw-w-[547px] '
                      label='Enter wait Period'
                      InputProps={{
                        style: { height: '46px', marginTop: '3px' },
                      }}
                    />
                  </div>
                  <div>
                    <DemoItem>
                      <MobileTimePicker
                        defaultValue={dayjs('2022-04-17T15:30')}
                        style={{ height: '40px' }}
                      />
                    </DemoItem>
                  </div>
                </div>
                <div className='tw-flex tw-gap-4 tw-items-center'>
                  <div className='tw-text-base tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                    Flow 1
                  </div>
                  <div>
                    <FormControl style={{ minWidth: 720 }}>
                      <Select
                        multiple
                        fullWidth
                        value={personName}
                        onChange={handleChange}
                        MenuProps={MenuProps}
                        style={{ minWidth: '100% !important', height: '44px' }}
                        displayEmpty
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return (
                              <span className='tw-text-[#667085]'>
                                Email- Appoitnment-3
                              </span>
                            );
                          }
                          return selected.join(', ');
                        }}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className='tw-flex tw-gap-4 tw-items-center'>
                  <div className='tw-text-base tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                    Filter Audience ,where
                  </div>
                  <div>
                    <FormControl style={{ minWidth: 166 }}>
                      <Select
                        multiple
                        fullWidth
                        value={personName}
                        onChange={handleChange}
                        MenuProps={MenuProps}
                        style={{ minWidth: '100% !important', height: '44px' }}
                        displayEmpty
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return (
                              <span className='tw-text-[#667085]'>
                                Free_code4
                              </span>
                            );
                          }
                          return selected.join(', ');
                        }}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl style={{ minWidth: 166 }}>
                      <Select
                        multiple
                        fullWidth
                        value={personName}
                        onChange={handleChange}
                        MenuProps={MenuProps}
                        style={{ minWidth: '100% !important', height: '44px' }}
                        displayEmpty
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return (
                              <span className='tw-text-[#667085]'>Equals</span>
                            );
                          }
                          return selected.join(', ');
                        }}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl style={{ minWidth: 120 }}>
                      <Select
                        multiple
                        fullWidth
                        value={personName}
                        onChange={handleChange}
                        MenuProps={MenuProps}
                        style={{ minWidth: '100% !important', height: '44px' }}
                        displayEmpty
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return (
                              <span className='tw-text-[#667085]'>Yes</span>
                            );
                          }
                          return selected.join(', ');
                        }}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className='tw-w-10 hover:tw-cursor-pointer tw-grid tw-place-content-center tw-h-11 tw-gap-2.5 tw-border tw-p-1.5 tw-rounded-lg tw-border-solid tw-border-[#D0D5DD]'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M8 1V15M1 8H15'
                        stroke='#667085'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  </div>
                  <div className='tw-w-10 hover:tw-cursor-pointer tw-grid tw-place-content-center tw-h-11 tw-gap-2.5 tw-border tw-p-1.5 tw-rounded-lg tw-border-solid tw-border-[#D0D5DD]'>
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 20 20'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M7 1H13M1 4H19M17 4L16.2987 14.5193C16.1935 16.0975 16.1409 16.8867 15.8 17.485C15.4999 18.0118 15.0472 18.4353 14.5017 18.6997C13.882 19 13.0911 19 11.5093 19H8.49065C6.90891 19 6.11803 19 5.49834 18.6997C4.95276 18.4353 4.50009 18.0118 4.19998 17.485C3.85911 16.8867 3.8065 16.0975 3.70129 14.5193L3 4M8 8.5V13.5M12 8.5V13.5'
                        stroke='#667085'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  </div>
                </div>
                <div className='tw-flex tw-gap-4 tw-items-center'>
                  <div className='tw-text-base tw-whitespace-nowrap tw-font-medium tw-leading-6 tw-text-left tw-text-[#344054]'>
                    Flow 2
                  </div>
                  <div>
                    <FormControl style={{ minWidth: 720 }}>
                      <Select
                        multiple
                        fullWidth
                        value={personName}
                        onChange={handleChange}
                        MenuProps={MenuProps}
                        style={{ minWidth: '100% !important', height: '44px' }}
                        displayEmpty
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return (
                              <span className='tw-text-[#667085]'>
                                Email- Appoitnment-3
                              </span>
                            );
                          }
                          return selected.join(', ');
                        }}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className='tw-flex tw-gap-4 tw-justify-end'>
                  <div
                    onClick={() => mergePopUpCloseHandler()}
                    className='tw-w-[111px] tw-grid tw-place-content-center  tw-h-11 tw-gap-3 tw-border tw-text-lg tw-font-medium tw-leading-5 tw-text-left tw-text-[#021133] tw-px-4 tw-py-3.5 tw-rounded-lg tw-border-solid tw-border-[#021133] hover:tw-bg-[#021133] hover:tw-text-emerald-50 hover:tw-cursor-pointer'
                  >
                    Discard
                  </div>
                  <div
                    onClick={() => mergePopUpCloseHandler()}
                    className='tw-w-[111px] tw-grid tw-place-content-center tw-h-11 tw-gap-3 tw-border tw-text-lg tw-font-medium tw-leading-5 tw-text-left  tw-px-4 tw-py-3.5 tw-rounded-lg tw-border-solid tw-border-[#021133] tw-bg-[#021133] tw-text-emerald-50 hover:tw-cursor-pointer'
                  >
                    Save
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
}
