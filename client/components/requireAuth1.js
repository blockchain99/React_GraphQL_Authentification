//if not login, redirect over login router application.
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import currentUserQuery from '../queries/CurrentUser';
import { hashHistory } from 'react-router';


//use currentUser query(check this.props.data.user),
//if user returned, signed in,
// else not. => kick to other application.
// But need chcking data.user still loading(preventing
// route to other before finishing query)

export default (WrappedComponent) => {
  class RequireAuth extends Component {
//only called when component first render to the screen
//1) Login with email, pwd / Logout click -> loading: false, user obj
//2) => no longer signed in but Still false, user not chnaged in
//Chrome Console(not componentDidMount rerendered).=> solution:
//use componentWillUpdate instead of componentDidMount.
    componentDidMount() {
      console.log(this.props.data.loading, this.props.data.user);
      // if(!this.props.data.user) {
  //data not loading(query finished) && user not signed in(not auth'd)
      if(!this.props.data.loading && !this.props.data.user) {
        hashHistory.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
