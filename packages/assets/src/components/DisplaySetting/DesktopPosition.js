import React from 'react';
import {Labelled, LegacyStack, Text} from '@shopify/polaris';

const defaultOptions = [
  {label: 'Bottom left', value: 'bottom-left'},
  {label: 'Bottom right', value: 'bottom-right'},
  {label: 'Top left', value: 'top-left'},
  {label: 'Top right', value: 'top-right'}
];
// eslint-disable-next-line react/prop-types
export default function DesktopPosition({
                                          id,
                                          label,
                                          value,
                                          onChange,
                                          helpText,
                                          options = defaultOptions
                                        }) {
  return (
    <Labelled label={label} id={id}>
      <LegacyStack>
        {options.map((option, key) => (
          <div
            key={key}
            className={`Avada-DesktopPosition ${
              value === option.value ? 'Avada-DesktopPosition--selected' : ''
            }`}
            onClick={() => onChange(option.value)}
          >
            <div
              className={`Avada-DesktopPosition__Input Avada-DesktopPosition__Input--${option.value}`}
            ></div>
          </div>
        ))}
      </LegacyStack>
      <Text variant="bodyLg" as="p" tone={'subdued'}>
        {helpText}
      </Text>
    </Labelled>
  );
}
