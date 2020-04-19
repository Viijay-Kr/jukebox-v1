const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "users", url: "http://localhost:4001/query" },
    { name: "playlists", url: "http://localhost:4002/query" },
    { name: "songs", url: "http://localhost:4003/query" },
  ],
});

const server = new ApolloServer({
  gateway,

  subscriptions: false,
});

server
  .listen({
    port: 8888,
  })
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
