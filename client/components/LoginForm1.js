import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';

class LoginForm extends Component {
//call back
  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }] //refetch current user's id, email
 //pause the execution of code,wait the debugger to catch
    }).catch(res => { debugger });
  }
  render() {
    return(
      <div>
      <h3>Login</h3>
       <AuthForm onSubmit={this.onSubmit.bind(this)}/>
      </div>
    );
  }
}
