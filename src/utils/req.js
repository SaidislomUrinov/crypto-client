import axios from "axios";
export const API = 'http://localhost:5000';
export const getReq = (pref = '', params = {}) => {
    return axios(`${API}/api${pref}`, {
        headers: {
            'x-auth-token': `Bearer ${localStorage?.access}`,
        },
        params,
    });
}
export const postReq = (pref = '', data = {}, params = {}) => {
    return axios.post(`${API}/api${pref}`, data, {
        headers: {
            'x-auth-token': `Bearer ${localStorage?.access}`,
        },
        params,
    });
};