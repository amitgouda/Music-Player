
import { handleApiCall } from "./api";

export const getAllPlaylistApi = (param = {}, resultHandler, faultHandler) => {
  handleApiCall("playlist/all", param, "get", resultHandler, faultHandler);
};

export const addPlaylistApi = (param = {}, resultHandler, faultHandler) => {
  handleApiCall("playlist/create", param, "post", resultHandler, faultHandler);
};

export const updatePlaylistApi = (param = {}, resultHandler, faultHandler) => {
  handleApiCall("playlist/update", param, "post", resultHandler, faultHandler);
};
