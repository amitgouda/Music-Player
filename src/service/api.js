import APICall from "./index";

export const handleApiCall = (
  url,
  param = {},
  type,
  resultHandler,
  faultHandler
) => {
  APICall(url, param, type)
    .then((res) => (resultHandler ? resultHandler(res) : null))
    .catch((err) => (faultHandler ? faultHandler(err) : null));
};
