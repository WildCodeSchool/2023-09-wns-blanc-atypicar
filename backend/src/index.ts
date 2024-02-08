import "reflect-metadata"
import { dataSource } from './config/db';
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { JourneyResolver } from "./resolvers/journey.resolver";
import * as dotenv from "dotenv";
import { ReservationResolver } from "./resolvers/reservation.resolver";

const port: number = 3001;

const start = async () => {
  dotenv.config();
  await dataSource.initialize();
  
  const schema = await buildSchema({
    resolvers: [JourneyResolver, ReservationResolver],
    validate: { forbidUnknownValues: false },
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      if (
        req?.headers.authorization === undefined ||
        process.env.JWT_SECRET_KEY === undefined
      ) {
        return {};
      } else {
        try {
          const bearer = req.headers.authorization.split("Bearer ")[1];

          return { token: bearer };
        } catch (e) {
          console.log(e);
          return {};
        }
      }
    },
  });

  try {
    const { url } = await server.listen({ port });
    console.log(`Server running at ${url}`);
    
  } catch(err) {
    console.error("Error starting the server");
  }
}

void start();