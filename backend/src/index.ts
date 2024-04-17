import "reflect-metadata";
import { dataSource } from "./config/db";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { JourneyResolver } from "./resolvers/journey.resolver";
import * as dotenv from "dotenv";
import { ReservationResolver } from "./resolvers/reservation.resolver";
import { UserResolver } from "./resolvers/user.resolver";
import { verifyToken } from "./services/auth.service";
import { getUserByEmail } from "./services/user.service";
import { CategoryResolver } from "./resolvers/category.resolver";

const port: number = 3001;

const start = async () => {
  dotenv.config();
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [
      JourneyResolver,
      ReservationResolver,
      UserResolver,
      CategoryResolver,
    ],
    validate: { forbidUnknownValues: false },
    authChecker: async ({ context }, roles) => {
      try {
        const payload: any = verifyToken(context.token);
        const userFromDb = await getUserByEmail(payload.email);
        context.user = userFromDb;

        return true;
      } catch (error) {
        return false;
      }
    },
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
  } catch (err) {
    console.error("Error starting the server");
  }
};

void start();
