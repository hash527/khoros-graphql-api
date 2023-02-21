import { createCache } from "async-cache-dedupe";
import Redis from "ioredis";
import { fields } from "./fields";
import { subQueries } from "./subQueries";
import khorosApi from "./khorosApi";

//@ts-ignoree
export const client = new Redis(process.env.REDIS_CLIENT_URL);

const cache = createCache({
  ttl: 600, // seconds
  storage: {
    type: "redis",
    options: { client, invalidation: { referencesTTL: 600 } },
  },
});

cache.define(
  "fetchMessages",
  {
    references: () => ["messages"],
  },
  async (limit) => {
    const response = await khorosApi
      .post("search", {
        json: [
          {
            messages: {
              fields,
              limit: limit,
              subQueries,
            },
          },
        ],
      })
      .json();
    return response;
  }
);

cache.define(
  "fetchMessage",
  {
    references: () => ["message"],
  },
  async (id) => {
    const response = await khorosApi
      .post("search", {
        json: [
          {
            messages: {
              fields,
              constraints: [{ id: id }],
              subQueries,
            },
          },
        ],
      })
      .json();
    return response;
  }
);

export default cache;
