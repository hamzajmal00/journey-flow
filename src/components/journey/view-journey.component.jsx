import React from 'react';
import Toolbar from './components/toolbar/toolbar.component';
import ToolsSidebar from './components/tool-sidebar/tools-sidebar.component';
import Canvas from './components/canvas/canvas.component';
import Sidebar from '../common/layout/sidebar/sidebar.component';

export default function ViewJourney() {
  return (
    <div className=''>
      <Toolbar />

      <div style={{ display: 'flex', height: '100%', position: 'relative' }}>
        <Sidebar />
        <Canvas />
        <ToolsSidebar />
      </div>
    </div>
  );
}
