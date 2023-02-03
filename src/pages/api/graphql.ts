import { createYoga } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";
import { schema } from "./schema";
// import { useResponseCache } from "@graphql-yoga/plugin-response-cache";

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  //@ts-ignore
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
  // plugins: [
  //   useResponseCache({
  //     // global cache
  //     session: () => null,
  //     ttl: 3600000,
  //   }),
  // ],
});
