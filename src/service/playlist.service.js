
import { handleApiCall } from "./api";

export const getAllPlaylistApi = (param = {}, resultHandler, faultHandler) => {
  handleApiCall("playlist/all", param, "get", resultHandler, faultHandler);
};

export const loginApi = (param = {}, resultHandler, faultHandler) => {
  handleApiCall("auth/signin", param, "post", resultHandler, faultHandler);
};
