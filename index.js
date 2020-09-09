/**
 * @format
 */
import {ApolloProvider} from '@apollo/client';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import client from './utils/apolloClient';
import React from 'react';

const AppClient = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
AppRegistry.registerComponent(appName, () => AppClient);
