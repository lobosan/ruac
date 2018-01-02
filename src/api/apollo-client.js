import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
  uri: 'http://172.17.6.74:3000/graphql',
  credentials: 'include'
})

// Request Headers
const middlewareLink = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('token'),
    'x-refresh-token': localStorage.getItem('refresh-token')
  }
}))

// Response Headers
const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext()
    const { response: { headers } } = context
    if (headers) { // Set when refreshing tokens
      const token = headers.get('x-token')
      if (token) localStorage.setItem('token', token)
      const refreshToken = headers.get('x-refresh-token')
      if (refreshToken) localStorage.setItem('refresh-token', refreshToken)
    }
    return response
  })
})

const apolloClient = new ApolloClient({
  link: ApolloLink.from([afterwareLink, middlewareLink, httpLink]),
  cache: new InMemoryCache()
})

export default apolloClient
