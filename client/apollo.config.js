module.exports = {
  client: {
    service: "jukebox",
    url: "http://localhost:40005/graphql",
    includes: ["./src/components/ListenRoom/**/**/*.tsx"],
    excludes: ["./node_modules"],
    output: ["./src/generated/listenroom"],
    tagName: "gql",
    target: "typescript",
  },
};
