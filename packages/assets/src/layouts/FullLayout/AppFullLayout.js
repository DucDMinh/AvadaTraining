// src/layouts/FullLayout/AppFullLayout.js
import React, {useState} from 'react';
import {Frame, Scrollable} from '@shopify/polaris';
import AppTopBar from '@assets/layouts/AppLayout/AppTopBar';

export default function AppFullLayout({children}) {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const toggleOpenNav = () => setIsNavOpen(prev => !prev);

  return (
    <Frame
      topBar={<AppTopBar isNavOpen={isNavOpen} toggleOpenNav={toggleOpenNav}/>}
      navigation={isNavOpen ? <AppNavigation/> : null}
    >
      <Scrollable style={{height: 'calc(100vh - 56px)'}}>
        {children}
      </Scrollable>
    </Frame>
  );
}
