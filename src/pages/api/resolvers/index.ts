import { getMessages } from "../khorosApi";
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
