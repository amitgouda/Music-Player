export const authenticate = () => {
  const data = JSON.parse(localStorage.getItem("userData"));

  return Boolean(data?.token);
};
