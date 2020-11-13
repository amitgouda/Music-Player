export const authenticate = () => {
  const data = getLocalStorageData("userData");

  return Boolean(data?.token);
};

export const getToken = () => {
  const data = getLocalStorageData("userData");

  return data?.token;
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export const getLocalStorageData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
