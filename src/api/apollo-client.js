import ApolloClient, { createNetworkInterface } from 'apollo-client'

const networkInterface = createNetworkInterface({
  uri: 'http://172.17.6.74:3000/graphql',
  opts: { credentials: 'include' }
})

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    req.options.headers['x-token'] = localStorage.getItem('token')
    req.options.headers['x-refresh-token'] = localStorage.getItem('refresh-token')
    next()
  }
}])

networkInterface.useAfter([{
  applyAfterware ({ response: { headers } }, next) {
    const token = headers.get('x-token')
    const refreshToken = headers.get('x-refresh-token')
    if (token) {
      localStorage.setItem('token', token)
    }
    if (refreshToken) {
      localStorage.setItem('refresh-token', refreshToken)
    }
    next()
  }
}])

const apolloClient = new ApolloClient({
  networkInterface
})

export default apolloClient
