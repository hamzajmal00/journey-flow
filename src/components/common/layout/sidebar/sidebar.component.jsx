import React, { useState } from 'react';
import ThreeLinesIcon from '../../icons/three-lines.icon';
import HomeIcon from '../../icons/home.icon';
import ScreenIcon from '../../icons/screen.icon';
import LinksIcon from '../../icons/links.icon';
import ConnectionIcon from '../../icons/connection.icon';
import AnnaouncementIcon from '../../icons/annaouncement.icon';
import StatsIcon from '../../icons/stats.icon';
import ChatIcon from '../../icons/chat.icon';

export default function Sidebar() {
  const [showMenuBar, setShowMenuBar] = useState(false);
  return (
    <div className='tw-flex tw-gap-10'>
      {!showMenuBar ? (
        <div
          onClick={() => setShowMenuBar(true)}
          className='tw-fixed tw-top-[50%] tw-translate-x-[0%] tw--translate-y-2/4 tw-z-10 tw-left-0 tw-w-[21.02px]  tw-h-[282px] tw-gap-2.5  tw-bg-[#021133] tw-px-[4px] tw-py-[133px] tw-rounded-[0px_16px_16px_0px]  hover:tw-cursor-pointer'
        >
          {' '}
          <ThreeLinesIcon />
        </div>
      ) : (
        <div
          onClick={() => setShowMenuBar(false)}
          className={`tw-fixed tw-top-[20%] tw-flex tw-flex-col tw-gap-4 tw-z-10 tw-bg-[#021133] tw-w-16 tw-h-[556px] tw-pt-10 tw-pb-6 tw-rounded-[12px] tw-left-[5px] ${
            showMenuBar ? 'tw-opacity-100' : 'tw-opacity-0'
          } tw-transition-opacity tw-duration-500 tw-ease-in-out`}
        >
          <div className='tw-px-5 tw-py-2 hover:tw-cursor-pointer hover:tw-bg-[#0081B0]'>
            <HomeIcon />
          </div>
          <div className='tw-px-5 tw-py-2 hover:tw-cursor-pointer hover:tw-bg-[#0081B0]'>
            <ScreenIcon />
          </div>
          <div className='tw-px-5 tw-py-2 hover:tw-cursor-pointer hover:tw-bg-[#0081B0]'>
            <LinksIcon />
          </div>
          <div className='tw-px-5 tw-py-2 hover:tw-cursor-pointer hover:tw-bg-[#0081B0]'>
            <ConnectionIcon />
          </div>
          <div className='tw-px-5 tw-py-2 hover:tw-cursor-pointer hover:tw-bg-[#0081B0]'>
            <AnnaouncementIcon />
          </div>
          <div className='tw-px-5 tw-py-2 hover:tw-cursor-pointer hover:tw-bg-[#0081B0]'>
            <StatsIcon />
          </div>
          <div className='tw-px-5 tw-py-2 hover:tw-cursor-pointer hover:tw-bg-[#0081B0]'>
            <ChatIcon />
          </div>
        </div>
      )}
    </div>
  );
}
