import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';

class LoginForm extends Component {
 constructor(props) {
   super(props);
 //default is array, not null or undefined.
 //error = this.state.error, which is []
   this.state = { errors: [] };
 }

//call back
  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }] //refetch current user's id, email
 //pause the execution of code,wait the debugger to catch
    }).catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
     });
  }
  render() {
    return(
      <div>
      <h3>Login</h3>
       <AuthForm
        errors={this.state.errors}
        onSubmit={this.onSubmit.bind(this)}
      />
      </div>
    );
  }
}

export default graphql(mutation)(LoginForm);
