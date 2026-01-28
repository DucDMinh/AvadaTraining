import React from 'react';
import {BlockStack, Select, Text, TextField} from '@shopify/polaris';
import '../DisplaySetting/DisplaySetting.scss';

// eslint-disable-next-line react/prop-types
export default function TriggerSetting({settings, onChange}) {
  const options = [
    {label: 'All pages', value: 'all'},
    {label: 'Specific pages', value: 'specific'}
  ];

  return (
    <BlockStack gap="400">
      <Text variant="headingSm" as="h5" tone="subdued" textTransform="uppercase">
        PAGES RESTRICTION
      </Text>

      <Select
        options={options}
        value={settings.pagesRestriction}
        onChange={val => onChange('pagesRestriction', val)}
      />

      {settings.pagesRestriction === 'specific' && (
        <TextField
          label="Included pages"
          value={settings.includedUrls}
          onChange={val => onChange('includedUrls', val)}
          multiline={4}
          autoComplete="off"
          helpText="Page URLs to show the pop-up (separated by new lines)"
        />
      )}

      <TextField
        label="Excluded pages"
        value={settings.excludedUrls}
        onChange={val => onChange('excludedUrls', val)}
        multiline={4}
        autoComplete="off"
        helpText="Page URLs NOT to show the pop-up (separated by new lines)"
      />
    </BlockStack>
  );
}
