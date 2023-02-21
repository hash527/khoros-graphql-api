import { GraphQLError } from "graphql";
import cache from "./cache";
import khorosApi from "./khorosApi";

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

// export const modifyMessage = async (id: string) => {
//   const response = await khorosApi
//     .put(`messages/${id}`, {
//       json: [
//         {
//           data: {
//             type: "message",
//             subject: "This is the updated message subject",
//             body: "This is the updated message body",
//           },
//         },
//       ],
//     })
//     .json();
//   return response;
// };

export const getMessage = async (id: any) => {
  try {
    //@ts-ignore
    const p1 = await cache.fetchMessage(id);
    const response = await Promise.all([p1]);
    return response[0]?.data?.items[0];
  } catch (error) {
    console.log(error);
    throw new GraphQLError("Unable to retrieve messages");
  }
};
