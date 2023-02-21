import cache from "../khoros/cache";
import { getMessage, getMessages } from "../khoros";
import { modifyMessage } from "../khoros/khorosApi";
export const messages = async (
  obj: any,
  args: any,
  context: any,
  info: any
) => {
  try {
    const response = await getMessages(args.limit);
    //@ts-ignore
    return response;
  } catch (err) {
    return err;
  }
};

export const message = async (obj: any, args: any, context: any, info: any) => {
  try {
    const response = await getMessage(args.id);
    return response;
  } catch (err) {
    return err;
  }
};

export const updateMessage = async (
  obj: any,
  args: any,
  context: any,
  info: any
) => {
  try {
    const response = await modifyMessage(args.input);
    // cache.invalidateAll('')
    return response;
  } catch (err) {
    return err;
  }
};
