import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';


class LoginForm extends Component {
 constructor(props) {
   super(props);
 //default is array, not null or undefined.
 //error = this.state.error, which is []
   this.state = { errors: [] };
 }
//lifecycle method
 componentWillUpdate(nextProps) {
//the old, current set of nextProps
   // this.props
//the next set of props that will be in place
//when the component rerenders
   // nextProps
   // console.log(this.props, nextProps);
/* above executed, Network/console,

+1st(this.props)-> loading: true,
2nd(nextProps) -> loading: false  */

//not signed in but now is.
//Check whether authentication state has changed.
if(!this.props.data.user && nextProps.data.user) {
  //redirect to dashborad!!!
  hashHistory.push('/dashboard');
  }
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

export default graphql(query)(
  graphql(mutation)(LoginForm)
);
