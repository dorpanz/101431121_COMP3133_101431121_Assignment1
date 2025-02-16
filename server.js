const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const schema = require('./schema');
const resolver = require('./resolvers');
const DB_NAME = "comp3133_assignment1";
const DB_USER_NAME = "hapoves";
const DB_PASSWORD = "041104iii";
const CLUSTER_ID = "t2yhh";
const MONGODB_URL = 'mongodb+srv://hapoves:041104iii@cluster.t2yhh.mongodb.net/comp3133_assignment1?retryWrites=true&w=majority&appName=Cluster'
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); 
    }
};

const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolver,
});

const app = express();
app.use(express.json());
app.use(cors());

const startServer = async () => {
    await server.start(); 
    server.applyMiddleware({ app }); 

    app.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
        connectDB(); 
    });
};

startServer();