// src/pages/Home/Home.js
import React from 'react';
import {Button, Card, InlineStack, Page, Text} from '@shopify/polaris';

export default function Home() {
  return (
    <Page title="Home">
      <Card padding="400">
        <InlineStack align="space-between" blockAlign="center">
          <Text as="p">App status is <strong>disabled</strong></Text>
          <Button variant="primary" tone="success">Enable</Button>
        </InlineStack>
      </Card>
    </Page>
  );
}
