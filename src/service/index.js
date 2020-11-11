import axios from "axios";

const getToken = () => {
  return "";
};

const parsedError = (error) => {
  let response;

  if (error.response) {
    response = error.response;
  }

  if (response.status === 401 || response.status === 403) {
    const message =
      response.status === 401
        ? response.data.message
        : "Your session has expired, Please login again";
    return {
      message: message,
      status: response.status,
    };
  } else if (response.status === 404) {
    return Promise.reject({
      message: "Page Not Found",
      status: response.status,
    });
  } else {
    const message = error.response
      ? response && response.data && response.data.message
      : error.message;

    return {
      message: message,
      status: response ? response.status : 500,
      data: error.config.data,
    };
  }
};

const parseBody = (response) => {
  if (response && (response.data === null || response.data === undefined)) {
    return Promise.reject({ message: "Resource Not Found" });
  }

  let exception = true;

  if (response.data && (response.status === 200 || response.status === 201)) {
    exception = false;
  }

  return exception ? parsedError(response.data) : response.data;
};

const instance = axios.create({
  baseURL: "http://48bdf13580ca.ngrok.io/api/",
});

instance.interceptors.request.use(
  (config) => {
    if (
      !window.location.pathname.includes("register") &&
      window.location.pathname !== "/login"
    ) {
      config.headers.Authorization = "Token " + getToken();
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const result = parseBody(response);

    return result;
  },
  (error) => {
    const err = parsedError(error);

    return Promise.reject(err);
  }
);

const APICall = (url, data, method) => {
  switch (method) {
    case "post":
      return new Promise((resolve, reject) => {
        instance
          .post(url, data, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          })
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    case "get":
      return new Promise((resolve, reject) => {
        instance
          .get(url, (data = {}), {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          })
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    default:
      return;
  }
};

export default APICall;
