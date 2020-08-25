  
import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';
import {setContext} from 'apollo-link-context';
import {ApolloLink} from 'apollo-link';


const httpLink = createHttpLink({
    uri:"https://graph.artfactoryedu.com/graphql"
});

const authLink = setContext(() => {
    const token = localStorage.getItem('art-adminpanel');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  const omitTypename = (key, value) => {
    return key === '__typename' ? undefined : value
  }
  
  const omitTypenameLink = new ApolloLink((operation, forward) => {
    if (operation.variables) {
      operation.variables = JSON.parse(
        JSON.stringify(operation.variables),
        omitTypename
      )
    }
    return forward(operation)
  });
  const link = ApolloLink.from([authLink, omitTypenameLink, httpLink])

  const client = new ApolloClient({
    link,
    cache:new InMemoryCache()
});
export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)