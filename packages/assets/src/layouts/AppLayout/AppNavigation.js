// src/components/MainNavigation/MainNavigation.js
import React from 'react';
import {Navigation} from '@shopify/polaris';
import {HomeIcon, NotificationIcon, SettingsIcon} from '@shopify/polaris-icons';
import {useHistory, useLocation} from 'react-router-dom';

export default function MainNavigation() {
  const {pathname} = useLocation();
  const history = useHistory();

  return (
    <Navigation location={pathname}>
      <Navigation.Section
        items={[
          {
            label: 'Home',
            icon: HomeIcon,
            selected: pathname === '/embed/',
            onClick: () => history.push('/')
          },
          {
            label: 'Notifications',
            icon: NotificationIcon,
            selected: pathname.includes('/notifications'),
            onClick: () => history.push('/notifications')
          },
          {
            label: 'Settings',
            icon: SettingsIcon,
            selected: pathname.includes('/settings'),
            onClick: () => history.push('/settings')
          }
        ]}
      />
    </Navigation>
  );
}
