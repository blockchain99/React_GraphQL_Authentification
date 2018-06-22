import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

/*1) update jsx returned by this thing. materialize css
2) Helper method: determin what button appear.
 */
class Header extends Component {
  onLogoutClick() {
    // mutation {
    //   logout {
    //     id
    //     email
    //   }
    // }
    this.props.mutate({
      // refetchQueries: [{ query: query }]
      refetchQueries: [{ query }]
    });
  }
  renderButtons() {
    const { loading, user } = this.props.data;
//look the query,if still loading, return empty div
    // if (this.props.data.loading) { return <div />; }
    if (loading) { return <div />; }
//if user exist, show logout button
    if(user) {
//Logout button clicked -> mutation to logout, then route back to root
      return (
        <li><a onClick={this.onLogoutClick.bind(this)}>Logout</a></li>
      );
    }else{ //user not exist
      return (
        <div>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }
  }
  render() {
    // console.log(this.props.data);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(Header)
);
