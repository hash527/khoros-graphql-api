import { messages } from "./../resolvers/index";
import { xml2json } from "xml-js";
import got from "got";
import { GraphQLError } from "graphql";

const community = {
  address: process.env.COMMUNITY_URL,
  username: process.env.COMMUNITY_USERNAME,
  password: process.env.COMMUNITY_PASSWORD,
};

import { createCache } from "async-cache-dedupe";

const cache = createCache({
  ttl: 600, // seconds
  storage: { type: "memory" },
});

const getToken = async (
  communityAddress: string,
  username: string,
  password: string
) => {
  const url = `https://${communityAddress}/restapi/vc/authentication/sessions/login`;

  try {
    const response = await got
      .post(url, {
        form: {
          "user.login": username,
          "user.password": password,
        },
      })
      .text();

    const jsonReponse = JSON.parse(
      xml2json(response, {
        compact: true,
      })
    );
    const sessionKey = jsonReponse.response.value._text;
    return sessionKey;
  } catch (error) {
    throw new GraphQLError("Authentication Failed");
  }
};

let token;
//@ts-ignore
getToken(community.address, community.username, community.password).then(
  (response) => (token = response)
);

const khorosApi = got.extend({
  prefixUrl: `https://${community.address}/api/2.0/`,
  headers: {
    "li-api-session-key": token,
  },
});

cache.define("fetchMessages", async (limit) => {
  // console.log("hit cache");
  const response = await khorosApi
    .post("search", {
      json: [
        {
          messages: {
            fields: [
              "type",
              "id",
              "href",
              "view_href",
              "subject",
              "search_snippet",
              "body",
              "teaser",
              "post_time",
              "post_time_friendly",
              "depth",
              "read_only",
              "edit_frozen",
              "language",
              "can_accept_solution",
              "placeholder",
              "is_solution",
              "moderation_status",
              "device_id",
              "popularity",
              "excluded_from_kudos_leaderboards",
              "is_promoted",
              "user_context",
              "custom_tags",
              "ratings",
              "replies",
              "attachments",
              "videos",
              "images",
              "labels",
              "kudos",
              "tkb_helpfulness_ratings",
              "tags",
              "current_revision",
              "metrics",
              "topic",
              "conversation",
              "board",
              "author",
            ],
            limit: limit,
            subQueries: {
              labels: {},
              kudos: {},
              tags: {},
              tkb_helpfulness_ratings: {},
              images: {},
              videos: {},
              attachments: {},
              replies: {},
              ratings: {},
              custom_tags: {},
            },
          },
        },
      ],
    })
    .json();
  return response;
});

cache.define("fetchMessage", async (id) => {
  const response = await khorosApi
    .post("search", {
      json: [
        {
          messages: {
            fields: [
              "type",
              "id",
              "href",
              "view_href",
              "subject",
              "search_snippet",
              "body",
              "teaser",
              "post_time",
              "post_time_friendly",
              "depth",
              "read_only",
              "edit_frozen",
              "language",
              "can_accept_solution",
              "placeholder",
              "is_solution",
              "moderation_status",
              "device_id",
              "popularity",
              "excluded_from_kudos_leaderboards",
              "is_promoted",
              "user_context",
              "custom_tags",
              "ratings",
              "replies",
              "attachments",
              "videos",
              "images",
              "labels",
              "kudos",
              "tkb_helpfulness_ratings",
              "tags",
              "current_revision",
              "metrics",
              "topic",
              "conversation",
              "board",
              "author",
            ],
            constraints: [{ id: id }],
            subQueries: {
              labels: {},
              kudos: {},
              tags: {},
              tkb_helpfulness_ratings: {},
              images: {},
              videos: {},
              attachments: {},
              replies: {},
              ratings: {},
              custom_tags: {},
            },
          },
        },
      ],
    })
    .json();
  return response;
});

export const getMessages = async (limit: any) => {
  try {
    //@ts-ignore
    const p1 = await cache.fetchMessages(limit);
    const response = await Promise.all([p1]);
    return response[0]?.data;
  } catch (error) {
    throw new GraphQLError("Unable to retrieve messages");
  }
};

export const getMessage = async (id: any) => {
  try {
    //@ts-ignore
    const p1 = await cache.fetchMessage(id);
    const response = await Promise.all([p1]);
    console.log("res", response);

    return response[0]?.data.items[0];
  } catch (error) {
    throw new GraphQLError("Unable to retrieve messages");
  }
};
