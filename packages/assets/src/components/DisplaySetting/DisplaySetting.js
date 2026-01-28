import React from 'react';
import {BlockStack, Checkbox, Grid, RangeSlider, Text, TextField} from '@shopify/polaris';
import DesktopPosition from '@assets/components/DisplaySetting/DesktopPosition';
import './DisplaySetting.scss';

// eslint-disable-next-line react/prop-types
export default function DisplaySetting({settings, onChange}) {
  // eslint-disable-next-line react/prop-types
  const RangeSetting = ({name, label, min, max, suffix, helpText}) => (
    <div style={{marginBottom: '16px'}}>
      <div style={{marginBottom: '4px'}}>
        <Text variant="bodyMd" as="span">
          {label}
        </Text>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '4px'}}>
        <div style={{flex: 1}}>
          <RangeSlider
            output
            min={min}
            max={max}
            value={settings[name]}
            onChange={val => onChange(name, Number(val))}
            label=""
          />
        </div>
        <div style={{width: '100px'}}>
          <TextField
            type="Number"
            value={settings[name]}
            onChange={val => onChange(name, Number(val))}
            suffix={suffix}
            autoComplete="off"
            min={min}
            max={max}
          />
        </div>
      </div>
      <Text variant="bodySm" tone="subdued" as="p">
        {helpText}
      </Text>
    </div>
  );

  return (
    <div className="display-setting-container">
      <Text variant="headingSm" as="h5" tone="subdued" textTransform="uppercase">
        APPEARANCE
      </Text>

      <div className="section-spacing">
        <DesktopPosition
          label="Desktop Position"
          value={settings.position}
          onChange={val => onChange('position', val)}
          helpText="The display position of the pop on your website."
        />
      </div>

      <div className="section-spacing">
        <BlockStack gap="400">
          <Checkbox
            label="Hide time ago"
            checked={settings.hideTimeAgo}
            onChange={val => onChange('hideTimeAgo', val)}
          />
          <Checkbox
            label="Truncate content text"
            checked={settings.truncateContent}
            onChange={val => onChange('truncateContent', val)}
            helpText="If your product name is long for one line, it will be truncated..."
          />
        </BlockStack>
      </div>

      <br/>
      <br/>

      <Text variant="headingSm" as="h5" tone="subdued" textTransform="uppercase">
        TIMING
      </Text>

      <div className="section-spacing">
        <Grid>
          <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>
            <RangeSetting
              name="displayDuration"
              label="Display duration"
              suffix="second(s)"
              min={1}
              max={60}
              helpText="How long each pop will display on your page."
            />
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>
            <RangeSetting
              name="firstDelay"
              label="Time before the first pop"
              suffix="second(s)"
              min={0}
              max={60}
              helpText="The delay time before the first notification."
            />
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>
            <RangeSetting
              name="gapTime"
              label="Gap time between two pops"
              suffix="second(s)"
              min={0}
              max={60}
              helpText="The time interval between two popup notifications."
            />
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>
            <RangeSetting
              name="maxPopups"
              label="Maximum of popups"
              suffix="pop(s)"
              min={1}
              max={80}
              helpText="The maximum number of popups are allowed to show."
            />
          </Grid.Cell>
        </Grid>
      </div>
    </div>
  );
}
