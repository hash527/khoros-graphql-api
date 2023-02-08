import { getMessage, getMessages } from "../khorosApi";
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
    //@ts-ignore
    console.log(response, "message");
    return response;
  } catch (err) {
    return err;
  }
};
