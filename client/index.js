import React from 'react';
import ReactDOM from 'react-dom';
//ApolloClient is default export, Tech interact with backend.
//but no idea how to work w/ react library, so it need glue layer
//,ApolloProvider to connect ApolloClient(fetch all the data) and
//react application(display all the data).
import ApolloClient, { createNetworkInterface } from 'apollo-client';
//react-apollo export several different property incl ApolloProvider.
import { ApolloProvider } from 'react-apollo';
import { Route, Router, hashHistory, IndexRoute } from 'react-router';
import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import requireAuth from './components/requireAuth';

const networkInterface = createNetworkInterface({
  uri: '/graphql', //end point is hosted by '/graphql'
  opts: {
 //Apollo send along cookies per every queries to backend server
    credentials: 'same-origin'
  }
});

//make use of ApolloClient lib to make local Apollo client.
//make request to backend server, using network interface.
const client = new ApolloClient({
  networkInterface,
//data id of obj to idenitfy every fetched record,
//which comes from server
  dataIdFromObject: o => o.id
});

//make sure App is always displayed as root as react-router component.
//then, App shows Header & any other component(body) provided by react-router
const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="dashboard" component={requireAuth(Dashboard)} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
