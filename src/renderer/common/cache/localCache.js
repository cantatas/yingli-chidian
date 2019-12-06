import localforage from 'localforage';
export const setItem = (name, value) => localforage.setItem(name, typeof value === 'object' ? JSON.stringify(value) : value);
export const getItem = name => localforage.getItem(name).then(res => JSON.parse(res));
