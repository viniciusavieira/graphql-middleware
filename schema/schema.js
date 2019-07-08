const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList 
} = graphql;

const books = [
  {name: 'Encontro com Rama', genre:'sci-fi' ,id: '1', authorId:'1'},
  {name: 'O fim da eternidade', genre:'sci-fi' ,id: '2', authorId:'2'},
  {name: 'Eu sou a lenda', genre:'fantasy' ,id: '3', authorId:'3'},
  {name: 'Os próprios Deuses', genre:'sci-fi' ,id: '4', authorId:'2'},
  {name: 'As cavernas de aço', genre:'sci-fi' ,id: '5', authorId:'2'},
  {name: 'O fim da infância', genre:'sci-fi' ,id: '6', authorId:'1'},
]

const authors = [
  {name: 'Arthur C. Clark', age:88, id: '1'},
  {name: 'Isac Asimov', age:86, id: '2'},
  {name: 'Richard Matherson', age:65, id: '3'},
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name : { type: GraphQLString },
    genre: { type: GraphQLString },
    author: { 
      type: AuthorType,
      resolve(parent, args) {
        return authors.find(author => author.id === parent.authorId);
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name : { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books.filter(book => book.authorId === parent.id)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return books.find(bookDb => bookDb.id === args.id)
      }
    },
    author: {
      type: AuthorType,
      args: {id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors.find(author => author.id === args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});