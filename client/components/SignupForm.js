import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Signup';
//need to wire up current user query to the component
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

 componentWillUpdate(nextProps) {//receiving new set of props.
//If previous set of props did not have signed-in user &&
//incoming props has one,  then Redirect user to dashboard.
   if(!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard');
   }
 }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
   }).catch(res => {
     const errors = res.graphQLErrors.map(error => error.message);
     this.setState({ errors });
   });
  }

  render() {
    return(
      <div>
      <h3>Sign Up</h3>
       <AuthForm
        errors={this.state.errors}
        onSubmit={this.onSubmit.bind(this)}
      />
      </div>
    );
  }
}

//wire up current user query to the component
export default graphql(query)(
  graphql(mutation)(SignupForm)
);
