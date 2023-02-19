import { getMessage, getMessages } from "../khoros";
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

export const modifyMessage = async (
  obj: any,
  args: any,
  context: any,
  info: any
) => {
  try {
    const { id, subject, body } = args.input;
    const response = await getMessage(args.input.id);
    return {
      ...response,
      id,
      subject,
      body,
    };
  } catch (err) {
    return err;
  }
};
