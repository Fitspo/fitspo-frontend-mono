import { NavigationProvider } from './navigation'
import { SafeArea } from './safe-area'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as Auth from '../helpers/auth'

const httpLink = createHttpLink({
  uri: 'http://192.168.86.21:8080/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  let userToken;
  try {
      userToken = await Auth.getToken();
  } catch (e) {
      console.log("Error checking for token")
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: userToken ? `Bearer ${userToken}` : "",
    }
  }
});

const client = new ApolloClient({
  // uri: 'http://localhost:8080/graphql',
  // uri: 'http://192.168.86.21:8080/graphql',
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});


export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SafeArea>
      <ApolloProvider client={client}>
        <NavigationProvider>{children}</NavigationProvider>
      </ApolloProvider>
    </SafeArea>
  )
}
