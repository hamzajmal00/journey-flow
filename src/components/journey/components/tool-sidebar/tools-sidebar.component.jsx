// src/components/Sidebar.jsx
import DoubleTriggerIcon from '@/components/common/icons/double-trigger.icon';
import EmailSidebarIcon from '@/components/common/icons/email-sidebar.icon';
import GoogleSidebarIcon from '@/components/common/icons/google-sidebar.icon';
import InstaSidebarIcon from '@/components/common/icons/insta-sidebar.icon';
import MessageSidebarIcon from '@/components/common/icons/message-sidebar.icon';
import PhoneSidebarIcon from '@/components/common/icons/phone-sidebar.icon';
import SingleTriggerIcon from '@/components/common/icons/single-trigger.icon';
import WhatsappSidebarIcon from '@/components/common/icons/whatsapp-sidebar.icon';
import XSidebarIcon from '@/components/common/icons/x-sidebar.icon';
import YoutubeSidebarIcon from '@/components/common/icons/youtube-sidebar.icon';
import React from 'react';

export default function ToolsSidebar() {
  const handleDragStart = (event, type) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };
  const menuItem = [
    {
      name: 'instagram',
      icon: <InstaSidebarIcon />,
    },
    {
      name: 'google',
      icon: <GoogleSidebarIcon />,
    },
    {
      name: 'phone',
      icon: <PhoneSidebarIcon />,
    },
    {
      name: 'message',
      icon: <MessageSidebarIcon />,
    },
    {
      name: 'x',
      icon: <XSidebarIcon />,
    },
    {
      name: 'email',
      icon: <EmailSidebarIcon />,
    },
    {
      name: 'whatsapp',
      icon: <WhatsappSidebarIcon />,
    },
    {
      name: 'youtube',
      icon: <YoutubeSidebarIcon />,
    },
  ];

  return (
    <div
      style={{
        width: '82px',
        height: '609px',
        padding: '16px 12px 16px 12px',
        gap: '10px',
        borderRadius: '16px 0px 0px 16px',
        opacity: '0px',
        background: 'linear-gradient(179.06deg, #0081B0 -0.74%, #000D22 62.1%)',
        position: 'fixed',
        right: '0px',
        top: '50%',
        transform: 'translate(0%, -50%)',
      }}
    >
      <div className=''>
        <div className='tw-text-sm tw-font-medium tw-leading-[21px] tw-text-left tw-text-white'>
          Triggers
        </div>
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, 'double-trigger')}
          style={{
            padding: '8px',
            margin: '4px',
            cursor: 'move',
          }}
        >
          <DoubleTriggerIcon />
        </div>
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, 'single-trigger')}
          style={{
            padding: '8px',
            margin: '4px',
            cursor: 'move',
          }}
        >
          <SingleTriggerIcon />
        </div>
        <div className='tw-h-px tw-bg-[#202F51] tw-mx-0 tw-my-2.5'></div>
      </div>
      <div className='tw-text-sm tw-font-medium tw-leading-[21px] tw-text-left tw-text-white'>
        Flows
      </div>
      {menuItem.map((item) => (
        <div
          key={item}
          draggable
          onDragStart={(event) => handleDragStart(event, item.name)}
          style={{
            padding: '8px',
            margin: '4px',
            cursor: 'move',
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}
