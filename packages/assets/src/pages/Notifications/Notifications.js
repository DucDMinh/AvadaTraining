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
      const response = await api('/notifications', {
        method: 'GET'
      });
      if (response.success && response.data) {
        const formattedItems = response.data.map(item => {
          const dateObj = item.timestamp?._seconds
            ? new Date(item.timestamp._seconds * 1000)
            : new Date(item.timestamp);

          return {
            ...item,
            createAt: dateObj.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }),
            timestampString: dateObj.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })
          };
        });

        setItems(formattedItems);
      }
    };
    fetchData().then(() => {
    });
  }, []);
  const sortOptions = [
    {label: 'Ascending by name', value: '1'},
    {label: 'Descending by name', value: '2'}
  ];
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const nameA = a.firstName || '';
      const nameB = b.firstName || '';

      if (sortValue === '1') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }, [items, sortValue]);
  const handleDelete = async id => {
    try {
      const response = await api('/notifications', {
        method: 'DELETE',
        body: {id: id} // Gửi ID lên server
      });

      if (response.success) {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
    }
  };
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
              timestampString,
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
                              {timestampString}
                              <span className="uni-blue">
                                <i className="fa fa-check" aria-hidden="true"/> by Avada
                              </span>
                            </div>
                          </div>
                        </a>
                        <XSmallIcon
                          style={{width: '25px', height: '25px'}}
                          onClick={() => handleDelete(id)}
                        />
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
