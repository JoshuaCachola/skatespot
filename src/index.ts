import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import { typeormConnection } from "./utils/typeormConnection";

(async () => {
  const app = express();
  app.get("/ping", (_, res) => res.send("pong"));

  await typeormConnection.create();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
  });

  apolloServer.applyMiddleware({ app });
  
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log("express server started...");
  });
})();
