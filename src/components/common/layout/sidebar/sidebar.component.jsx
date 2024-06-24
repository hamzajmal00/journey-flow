import React from 'react';
import ThreeLinesIcon from '../../icons/three-lines.icon';

export default function Sidebar() {
  return (
    <div className=''>
      <div className='tw-fixed tw-top-[100px] tw-z-10 tw-left-0 tw-w-[21.02px]  tw-h-[282px] tw-gap-2.5 tw-opacity-[0px] tw-bg-[#021133] tw-px-[4px] tw-py-[133px] tw-rounded-[0px_16px_16px_0px]  hover:tw-cursor-pointer'>
        {' '}
        <ThreeLinesIcon />
      </div>
    </div>
  );
}