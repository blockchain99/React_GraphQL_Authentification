const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString
} = graphql;

const UserType = require('./types/user_type');
//import auth server
const AuthService =  require('../services/auth');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
//incoming request from express svr
      // resolve(parentValue, args, request) {
      //   AuthService.signup({ args.email, args.password, request })
      // resolve(parentValue, { email, password }, request) {
      //   AuthService.signup({ email: email, password: password, req: request })
      resolve(parentValue, { email, password }, req) {
        return AuthService.signup({ email, password, req }); //async
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout(); //remove user property of the request obj.
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req }); //async
      }
    }
  }
});

module.exports = mutation;
