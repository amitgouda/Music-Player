import { handleApiCall } from "./api";

export const getAllSongApi = (param = {}, resultHandler, faultHandler) => {
  handleApiCall("song/allSong", param, "get", resultHandler, faultHandler);
};

export const loginApi = (param = {}, resultHandler, faultHandler) => {
  handleApiCall("auth/signin", param, "post", resultHandler, faultHandler);
};
