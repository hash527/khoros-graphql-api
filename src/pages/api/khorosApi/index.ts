import { xml2json } from "xml-js";
import got from "got";

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
};

const { address, username, password } = community;
//@ts-ignore
getToken(address, username, password).then((response) => {
  console.log("respnose is ", response);
});

let token;
//@ts-ignore
getToken(address, username, password).then((response) => (token = response));

const khorosApi = got.extend({
  prefixUrl: `https://${address}/api/2.0/`,
  headers: {
    "li-api-session-key": token,
  },
});

export const getMessages = async (limit: any) => {
  const response = await khorosApi
    .post("search", {
      json: [
        {
          messages: {
            fields: ["id", "subject"],
            limit: limit,
          },
        },
      ],
    })
    .json();

  // console.log("response is ", response);

  return response;
};
