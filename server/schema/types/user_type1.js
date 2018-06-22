const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString
} = graphql;
//user.js with email, password
const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    email: { type: GraphQLString }
  }
});

module.exports = UserType;
