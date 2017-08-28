import ApolloClient, { createNetworkInterface } from 'apollo-client'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql'
})

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}  // Create the header object if needed.
    }
    req.options.headers['authorization'] = localStorage.getItem('token') ? localStorage.getItem('token') : null
    next()
  }
}])

const apolloClient = new ApolloClient({
  networkInterface
})

export default apolloClient
