export const saveItem = (key: string, value: any) => {
  window.sessionStorage.setItem(key, JSON.stringify(key));
};

export const getItem = (key: string) => {
  const data = window.sessionStorage.getItem(key);
  return data ? JSON.parse(data) : {};
};
