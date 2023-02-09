import { xml2json } from "xml-js";
import got from "got";
import { GraphQLError } from "graphql";
import { fields } from "./fields";
import { subQueries } from "./subQueries";
import Redis from "ioredis";

let client = new Redis(
  "redis://default:317a7ca1f0fb405bbaa53d28f6ccf0bc@us1-solid-marten-39604.upstash.io:39604"
);

const community = {
  address: process.env.COMMUNITY_URL,
  username: process.env.COMMUNITY_USERNAME,
  password: process.env.COMMUNITY_PASSWORD,
};
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

export const khorosApi = got.extend({
  prefixUrl: `https://${community.address}/api/2.0/`,
  headers: {
    "li-api-session-key": token,
  },
});

export const getMessages = async (limit: any) => {
  try {
    const data = client.get("messages").then((result: any) => {
      return result;
    });
    const messages = await data;
    if (messages) {
      // console.log("hit cache");
      return JSON.parse(messages);
    }

    const response = await khorosApi
      .post("search", {
        json: [
          {
            messages: {
              fields,
              limit,
              subQueries,
            },
          },
        ],
      })
      .json();
    await client.set("messages", JSON.stringify(response));
    await client.expire("messages", 600);
    // console.log("miss cache");
    return response;
  } catch (error) {
    throw new GraphQLError("Unable to retrieve messages");
  }
};

export const getMessage = async (id: any) => {
  try {
    const data = client.get("message").then((result: any) => {
      return result;
    });
    const message = await data;
    if (message) {
      // console.log("hit cache");
      return JSON.parse(message).data.items[0];
    }
    const response = await khorosApi
      .post("search", {
        json: [
          {
            messages: {
              fields,
              constraints: [{ id }],
              subQueries,
            },
          },
        ],
      })
      .json();
    await client.set("message", JSON.stringify(response));
    await client.expire("message", 600);
    // console.log("miss cache");
    //@ts-ignore
    return response.data.items[0];
  } catch (error) {
    throw new GraphQLError("Unable to retrieve messages");
  }
};
