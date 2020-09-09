import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import React from 'react';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://skateapplicationforclients.herokuapp.com/',
});
const client = new ApolloClient({
  cache,
  link,
});

export default client;
