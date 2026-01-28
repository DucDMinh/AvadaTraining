import App from 'koa';
import 'isomorphic-fetch';
import {contentSecurityPolicy, shopifyAuth} from '@avada/core';
import shopifyConfig from '@functions/config/shopify';
import render from 'koa-ejs';
import path from 'path';
import createErrorHandler from '@functions/middleware/errorHandler';
import firebase from 'firebase-admin';
import appConfig from '@functions/config/app';
import shopifyOptionalScopes from '@functions/config/shopifyOptionalScopes';
import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
const settings = firestore.collection('settings');

if (firebase.apps.length === 0) {
  firebase.initializeApp();
}

// Initialize all demand configuration for an application
const app = new App();
app.proxy = true;

render(app, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
app.use(createErrorHandler());
app.use(contentSecurityPolicy(true));

// Register all routes for the application
app.use(
  shopifyAuth({
    apiKey: shopifyConfig.apiKey,
    accessTokenKey: shopifyConfig.accessTokenKey,
    firebaseApiKey: shopifyConfig.firebaseApiKey,
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    successRedirect: '/embed',
    initialPlan: {
      id: 'free',
      name: 'Free',
      price: 0,
      trialDays: 0,
      features: {}
    },
    hostName: appConfig.baseUrl,
    isEmbeddedApp: true,
    afterThemePublish: ctx => {
      // Publish assets when theme is published or changed here
      return (ctx.body = {
        success: true
      });
    },
    optionalScopes: shopifyOptionalScopes,
    afterLogin: ctx => {
      settings.add(
        {
          shopDomain: ctx.state.shopify.shop,
          shopId: ctx.state.user.shopID,
          position: 'bottom-left',
          hideTimeAgo: false,
          truncateContent: true,
          displayDuration: 5,
          firstDelay: 10,
          gapTime: 2,
          maxPopups: 20,
          pagesRestriction: 'all',
          includedUrls: '',
          excludedUrls: ''
        },
        {merge: true}
      );
    },
    afterInstall: ctx => {
      settings.add(
        {
          shopDomain: ctx.state.shopify.shop,
          shopId: ctx.state.user.shopID,
          position: 'bottom-left',
          hideTimeAgo: false,
          truncateContent: true,
          displayDuration: 5,
          firstDelay: 10,
          gapTime: 2,
          maxPopups: 20,
          pagesRestriction: 'all',
          includedUrls: '',
          excludedUrls: ''
        },
        {merge: true}
      );
    }
  }).routes()
);

// Handling all errors
app.on('error', err => {
  console.error(err);
});

export default app;
