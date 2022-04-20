import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';

const client = new ApolloClient ({
  uri: "http://php.test/graphql",
  cache: new InMemoryCache()
});

export default client;
