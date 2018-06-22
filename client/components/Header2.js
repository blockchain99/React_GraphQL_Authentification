import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
/*1) update jsx returned by this thing. materialize css
2) Helper method: determin what button appear.
 */
class Header extends Component {
  renderButtons() {
    const { loading, user } = this.props.data;
//look the query,if still loading, return empty div
    // if (this.props.data.loading) { return <div />; }
    if (loading) { return <div />; }
//if user exist, show logout button
    if(user) {
      return <div>Logout</div>;
    }else{ //user not exist
      return (
        <div>You are not signed.</div>
      );
    }
  }
  render() {
    // console.log(this.props.data);
    return (
      <nav>
        <div className="nav-wrapper">
          {this.renderButtons()}
        </div>
      </nav>
    );
  }
}

export default graphql(query)(Header);
