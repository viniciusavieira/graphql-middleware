const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const books = [
  {name: 'Encontro com Rama', genre:'sci-fi' ,id: '1'},
  {name: 'O fim da eternidade', genre:'sci-fi' ,id: '2'},
  {name: 'Eu sou a lenda', genre:'fantasy' ,id: '3'},
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name : { type: GraphQLString },
    genre: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //code to get data fom db
        return books.find((bookDb) => bookDb.id === args.id)
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});