const getFromStorage = (key: string) => {
  if (typeof global !== "undefined") {
    localStorage.getItem(key);
  }
};
const setToStorage = (key: string, value: string) => {
  if (typeof global !== "undefined") {
    return localStorage.setItem(key, value);
  }
};

export { getFromStorage, setToStorage };
