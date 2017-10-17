import ApolloClient, { createNetworkInterface } from 'apollo-client'

const networkInterface = createNetworkInterface({
  uri: 'http://172.17.6.74:3000/graphql',
  opts: {
    credentials: 'include'
  }
})

const apolloClient = new ApolloClient({
  networkInterface
})

export default apolloClient
