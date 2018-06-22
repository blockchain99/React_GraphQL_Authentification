const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;
//user.js with email, password
const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLID }, //dataIdFromObject: o => o.id
    email: { type: GraphQLString }
  }
});

module.exports = UserType;
