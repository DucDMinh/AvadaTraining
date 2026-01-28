import React, {useCallback, useEffect, useState} from 'react';
import {Button, LegacyCard, Page, ResourceItem, ResourceList, Tabs} from '@shopify/polaris';
import {XSmallIcon} from '@shopify/polaris-icons';
import './Settings.scss';
import DisplaySetting from '@assets/components/DisplaySetting/DisplaySetting';
import TriggerSetting from '@assets/components/TriggerSetting/TriggerSetting';
import defaultSetting from '@assets/const/defaultSetting';
import {api} from '@assets/helpers';

export default function Settings() {
  const [selected, setSelected] = useState(0);
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSettingsChange = useCallback((key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);
  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await api('/settings', {
          method: 'GET'
        });
        if (response.success && response.data) {
          console.log(response.data);
          setSettings(prev => ({
            ...prev,
            ...response.data
          }));
          console.log('true');
        } else {
          await api('/settings', {
            method: 'POST',
            body: defaultSetting
          });
          setSettings(defaultSetting);
        }
      } catch (e) {
        console.error('Failed to load settings', e);
      }
    }

    fetchSettings();
  }, []);
  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await api('/settings', {
        method: 'POST',
        body: settings
      });

      if (response.success) {
        console.log('Saved!');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  function resetSettings() {
    setSettings(defaultSetting);
  }

  const handleTabChange = useCallback(selectedTabIndex => setSelected(selectedTabIndex), []);

  const items = [
    {
      id: '100',
      firstName: 'John Doe',
      city: 'New York',
      country: 'United States',
      productName: 'Puffer Jacket With Hidden Hood',
      timestamp: 'a day ago',
      productImage:
        'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
      createAt: 'From March 8, \n2021'
    }
  ];

  const tabs = [
    {
      id: 0,
      content: 'Display',
      accessibilityLabel: 'Display settings',
      panelID: 'display-content'
    },
    {
      id: 1,
      content: 'Trigger',
      accessibilityLabel: 'Trigger settings',
      panelID: 'trigger-content'
    }
  ];

  return (
    <Page
      title="Settings"
      subtitle="Decide how your notifications will display"
      primaryAction={
        <Button
          size="large"
          variant="primary"
          tone="success"
          loading={loading}
          onClick={handleSave} // Gọi hàm save
        >
          Save
        </Button>
      }
      secondaryActions={
        <Button
          size="large"
          variant="secondary"
          tone="success"
          loading={loading}
          onClick={resetSettings} // Gọi hàm save
        >
          Reset to default
        </Button>
      }
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start'
        }}
      >
        <ResourceList
          resourceName={{singular: 'notification', plural: 'notifications'}}
          items={items}
          renderItem={item => {
            const {id, firstName, city, country, productName, timestamp, productImage} = item;

            return (
              <ResourceItem id={id} accessibilityLabel={`View details for ${firstName}`}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: '100%'
                  }}
                >
                  <div className={`Avava-SP__Wrapper fadeInUp animated ${settings.position}`}>
                    <div className="Avava-SP__Inner">
                      <div
                        className="Avava-SP__Container"
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          width: '100%'
                        }}
                      >
                        <a href="#" className={'Avava-SP__LinkWrapper'}>
                          <div
                            className="Avava-SP__Image"
                            style={{
                              backgroundImage: `url(${productImage})`
                            }}
                          ></div>
                          <div className="Avada-SP__Content">
                            <div className={'Avada-SP__Title'}>
                              {firstName} in {city}, {country}
                            </div>
                            <div className={'Avada-SP__Subtitle'}>
                              purchased{' '}
                              {settings.truncateContent && productName.length > 16
                                ? productName.substring(0, 16) + '...'
                                : productName}
                            </div>
                            <div className={'Avada-SP__Footer'}>
                              {!settings.hideTimeAgo && timestamp}{' '}
                              <span className="uni-blue">
                                <i className="fa fa-check" aria-hidden="true"/> by Avada
                              </span>
                            </div>
                          </div>
                        </a>
                        <XSmallIcon style={{width: '25px', height: '25px'}}/>
                      </div>
                    </div>
                  </div>
                </div>
              </ResourceItem>
            );
          }}
        />
        <div style={{width: '100%'}}>
          <LegacyCard>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              <LegacyCard.Section>
                {selected === 0 && (
                  <DisplaySetting settings={settings} onChange={handleSettingsChange}/>
                )}
                {selected === 1 && (
                  <TriggerSetting settings={settings} onChange={handleSettingsChange}/>
                )}
              </LegacyCard.Section>
            </Tabs>
          </LegacyCard>
        </div>
      </div>
    </Page>
  );
}
