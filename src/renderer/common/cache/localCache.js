

export const setItem = (name, value) => {
  localStorage.setItem(name, typeof value === 'object' ? JSON.stringify(value) : value);
};

export const getItem = name => localStorage.getItem(name);

