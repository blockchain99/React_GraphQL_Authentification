const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;
const Usertype = require('./user_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: Usertype,
//how to return the user, if req obj get som property,
//automatically placed on it, Passport work with req.
//req obj should have req.user property assigned to it.
//if user is not currently signed in, req.user is undefined,
//which graphql translate it as null.
      resolve(parentValue, args, req) {
        return req.user; //signed-in return it else null.
      }
    }
  }
});

module.exports = RootQueryType;
