import { GraphQLError } from "graphql";
import cache from "./cache";

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
