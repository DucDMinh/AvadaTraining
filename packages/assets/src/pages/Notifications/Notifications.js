import React, {useEffect, useMemo, useState} from 'react';
import {Card, Page, ResourceItem, ResourceList, Text} from '@shopify/polaris';
import './NoticationPopup.scss';
import {XSmallIcon} from '@shopify/polaris-icons';
import {api} from '@assets/helpers';

export default function Notifications() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('1');
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const notifications = await api('/notifications', {
        method: 'GET'
      });
      if (notifications.success && notifications.data) {
        console.log(notifications.data);
        setItems(prev => ({
          ...notifications.data
        }));
        console.log('true');
      }
    };
    fetchData().then(() => {
    });
  });
  // const items = [
  //   {
  //     id: '100',
  //     firstName: 'John Doe',
  //     city: 'New York',
  //     country: 'United States',
  //     productName: 'Puffer Jacket With Hidden Hood',
  //     timestamp: 'a day ago',
  //     productImage:
  //       'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
  //     createAt: 'From March 8, \n2021'
  //   },
  //   {
  //     id: '101',
  //     firstName: 'Jane Smith',
  //     city: 'London',
  //     country: 'United Kingdom',
  //     productName: 'Leather Bag',
  //     timestamp: '2 days ago',
  //     productImage:
  //       'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
  //     createAt: 'From March 7, \n2021'
  //   },
  //   {
  //     id: '102',
  //     firstName: 'Mike Ross', // M
  //     city: 'Toronto',
  //     country: 'Canada',
  //     productName: 'Sneakers',
  //     timestamp: '3 days ago',
  //     productImage:
  //       'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
  //     createAt: 'From March 6, \n2021'
  //   },
  //   {
  //     id: '104',
  //     firstName: 'John Doe',
  //     city: 'New York',
  //     country: 'United States',
  //     productName: 'Puffer Jacket With Hidden Hood',
  //     timestamp: 'a day ago',
  //     productImage:
  //       'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
  //     createAt: 'From March 8, \n2021'
  //   },
  //   {
  //     id: '105',
  //     firstName: 'Jane Smith',
  //     city: 'London',
  //     country: 'United Kingdom',
  //     productName: 'Leather Bag',
  //     timestamp: '2 days ago',
  //     productImage:
  //       'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
  //     createAt: 'From March 7, \n2021'
  //   },
  //   {
  //     id: '106',
  //     firstName: 'Mike Ross', // M
  //     city: 'Toronto',
  //     country: 'Canada',
  //     productName: 'Sneakers',
  //     timestamp: '3 days ago',
  //     productImage:
  //       'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
  //     createAt: 'From March 6, \n2021'
  //   }
  // ];

  const sortOptions = [
    {label: 'Ascending by name', value: '1'},
    {label: 'Descending by name', value: '2'}
  ];
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (sortValue === '1') {
        return a.firstName.localeCompare(b.firstName);
      } else {
        return b.firstName.localeCompare(a.firstName);
      }
    });
  }, [items, sortValue]);

  return (
    <Page title="Notifications" subtitle="List of sales notification from Shopify">
      <Card>
        <ResourceList
          resourceName={{singular: 'notification', plural: 'notifications'}}
          items={sortedItems}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          selectable
          sortValue={sortValue}
          sortOptions={sortOptions}
          onSortChange={selected => setSortValue(selected)}
          renderItem={item => {
            const {
              id,
              firstName,
              city,
              country,
              productName,
              timestamp,
              productImage,
              createAt
            } = item;

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
                  <div className="Avava-SP__Wrapper fadeInUp animated">
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
                            <div className={'Avada-SP__Subtitle'}>purchased {productName}</div>
                            <div className={'Avada-SP__Footer'}>
                              {timestamp}{' '}
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
                  <div style={{textAlign: 'right', whiteSpace: 'pre-line', minWidth: '120px'}}>
                    <Text as="p" variant="bodyMd" color="subdued">
                      {createAt}
                    </Text>
                  </div>
                </div>
              </ResourceItem>
            );
          }}
        />
      </Card>
    </Page>
  );
}
