const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

// 2 - GraphQL Schema Implementation
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links, //getAll
        link: (parent, args) => { //getById
            for (let index = 0; index < links.length; index++) {
                if (links[index].id === args.id) {
                    return links[index];
                }

            }
        },
    },
    Mutation: {

        post: (parent, args) => { //create

            let idCount = links.length

            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => { //update
            for (let index = 0; index < links.length; index++) {
                if (links[index].id === args.id) {
                    links[index].description = args.description;
                    links[index].url = args.url;
                    return links[index];
                }
            }
        },
        deleteLink: (parent, args) => { //delete
            for (let index = 0; index < links.length; index++) {
                if (links[index].id === args.id) {
                    links.splice(index, 1);
                    return links[index];
                }
            }
        }
    },
}

// 3 - Schema and Resolvers bundled and sent to Apollo Server
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
})

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );