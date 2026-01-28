// src/components/MainTopBar/MainTopBar.js
import React from 'react';
import {Text} from '@shopify/polaris';
import {LOGO_URL, LOGO_WIDTH} from '@assets/config/theme';

export default function MainTopBar() {
  return (
    <div
      style={{
        height: '60px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        borderBottom: '1px solid #dfe3e8',
        backgroundColor: 'white'
      }}
    >
      <img alt="Avada App Name" src={LOGO_URL} width={LOGO_WIDTH}/>
      <div>
        <Text variant="heading2xl" as="span">
          Avada
        </Text>
      </div>
    </div>
  );
}
