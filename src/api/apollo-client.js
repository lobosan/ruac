import ApolloClient, { createNetworkInterface } from 'apollo-client'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql'
})

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    const token = localStorage.getItem('token')
    if (token) req.options.headers['token'] = token
    next()
  }
}])

const apolloClient = new ApolloClient({
  networkInterface
})

export default apolloClient
