import { getnewchat } from "../api/chats";

export const createChat = (formdata, success) => async (dispatch) => {
  try {
    const { data } = await getnewchat(formdata);
    dispatch({ type: "UNLOAD" });
    success();
    return data;
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    return error;
  }
};
