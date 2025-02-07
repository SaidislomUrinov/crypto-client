import axios from "axios";
const API = 'http://localhost:5000';
export const getReq = (pref = '', params = {}) => {
    return axios(`${API}/${pref}`, {
        headers: {
            'x-auth-token': `Bearer ${localStorage?.access}`,
        },
        params,
    });
}
export const postReq = (pref = '', data = {}, params = {}) => {
    return axios(`${API}/${pref}`, data, {
        headers: {
            'x-auth-token': `Bearer ${localStorage?.access}`,
        },
        params,
    });
};