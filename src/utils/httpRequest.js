import axios from 'axios';

export const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});
export const httpRequestLogin = axios.create({
    baseURL: `http://localhost:3001`,
});
export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};
export const getLogin = async (path, options = {}) => {
    const response = await httpRequestLogin.get(path, options);
    return response.data;
};
export const post = async (path, data = {}) => {
    const response = await httpRequestLogin.post(path, data);
    return response.data;
};
