import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link'

const httpLink = createHttpLink({
  uri: 'http://172.17.6.74:3000/graphql',
  credentials: 'include'
})

const middlewareLink = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('token'),
    'x-refresh-token': localStorage.getItem('refresh-token')
  }
}))

const afterwareLink = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext()
  if (headers) {
    const token = headers.get('x-token')
    const refreshToken = headers.get('x-refresh-token')
    if (token) {
      localStorage.setItem('token', token)
    }
    if (refreshToken) {
      localStorage.setItem('refresh-token', refreshToken)
    }
  }
  return forward(operation)
})

const link = ApolloLink.from([afterwareLink, middlewareLink, httpLink])

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default apolloClient
