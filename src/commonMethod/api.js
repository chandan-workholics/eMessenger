import axios from 'axios';

const apiURL = 'http://206.189.130.102:3550/api';



const axiosApiInstance = axios.create({ baseURL: apiURL });

export const interceptor = () => {
    const checkTokenAndProceed = async (config) => {
        const token = sessionStorage.getItem('token');

        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',

            };
        } else {
            config.headers = {
                Accept: 'application/json',

            };
        }
        return config;
    };

    axiosApiInstance.interceptors.request.use(
        async (config) => {
            return checkTokenAndProceed(config);
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};


const callAPI = {

    get: (url, data) => {
        return axiosApiInstance.get(url, { params: data })
            .then(response => response)
            .catch(error => { return callAPI.catchError(error) });
    },

    post: (url, data) => {
        return axiosApiInstance.post(url, data)
            .then(response => response)
            .catch(error => { return callAPI.catchError(error) });
    },

    del: (url, data) => {
        return axiosApiInstance.delete(url, { data: data })
            .then(response => response)
            .catch(error => { return callAPI.catchError(error) });
    },

    delWithParams: (url, data) => {
        return axiosApiInstance.delete(url, { params: data })
            .then(response => response)
            .catch(error => { return callAPI.catchError(error) });
    },

    patch: (url, data) => {
        return axiosApiInstance.patch(url, data)
            .then(response => response)
            .catch(error => { return callAPI.catchError(error) });
    },

    put: (url, data) => {
        return axiosApiInstance.put(url, data)
            .then(response => response)
            .catch(error => { return callAPI.catchError(error) });
    },

    catchError: (response) => {
        const res = {
            message: '',
            status: response.response ? response.response.status : null
        };

        if (response.response && response.response.data.message && response.response.data.message.length > 0) {
            res.message = response.response.data.message;
        } else {
            res.message = 'Something went wrong.';
        }

        return res;
    }
};

export default callAPI;
