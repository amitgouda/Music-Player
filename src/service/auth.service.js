import { handleApiCall } from "./api";

export const signUpApi = (param = {}, resultHandler, faultHandler) => {
  handleApiCall("auth/signup", param, "post", resultHandler, faultHandler);
};

export const loginApi = (param = {}, resultHandler, faultHandler) => {
  handleApiCall("auth/signin", param, "post", resultHandler, faultHandler);
};
