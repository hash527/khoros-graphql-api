import { xml2json } from "xml-js";
import got from "got";
import { GraphQLError } from "graphql";
import axios from "axios";

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
    const sessionKey = jsonReponse.response?.value?._text;
    return sessionKey;
  } catch (error) {
    throw new GraphQLError("Authentication Failed");
  }
};

export const modifyMessage = async (data: any) => {
  const { id, subject, body } = data;
  const token = await getToken(
    community.address,
    community.username,
    community.password
  ).then((response) => response);
  const options = {
    method: "PUT",
    url: `https://${community.address}/api/2.0/messages/${id}`,
    headers: {
      "li-api-session-key": token,
      accept: "application/json",
      "content-type": "application/json",
    },
    data: {
      data: {
        type: "message",
        subject,
        body,
      },
    },
  };

  const response = await axios
    .request(options)
    .then(function async(response) {
      return response?.data?.data;
    })
    .catch(function (error) {
      console.error("error", error);
    });
  return response;
};

const khorosApi = got.extend({
  prefixUrl: `https://${community.address}/api/2.0/`,
  headers: {
    "li-api-session-key": "",
  },
});

export default khorosApi;
