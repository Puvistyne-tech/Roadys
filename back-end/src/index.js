import {importSchema} from 'graphql-import'
import path from 'path'
import dotenv from 'dotenv'
import {PrismaClient} from '@prisma/client'
import {ApolloServer} from 'apollo-server'
import resolvers from './graphql/resolvers'
import getUser from './graphql/user/helpers'

dotenv.config()

const typeDefs = importSchema(path.resolve(__dirname, 'graphql', 'schema.graphql'));

/**
 * Creating a new instance of the PrismaClient.
 *
 */
const prisma = new PrismaClient({
    rejectOnNotFound: {
        findFirst: {
            User: (err) => new Error(`User: ${err}`),
        },
        findMany: {
            User: (err) => new Error(`Users: ${err}`),
        },
    },
    errorFormat: 'minimal',
})

/**
 * Creating a new instance of the ApolloServer.
 * @type {ApolloServer}
 */
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => ({
        req,
        prisma,
        auth: await getUser(req.headers['authorization'], prisma),
    })
});

/**
 * Starting the server.
 */
server.listen({port: process.env.API_PORT}).then(({url}) => {
    console.log(process.env.POSTGRES_URL)
    console.log(`🚀  Server ready at ${url}`);
});

