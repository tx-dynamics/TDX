
import axios from 'axios';
export const BASE_URL = "https://tdx-cg85s.ondigitalocean.app/";
// export const BASE_URL = "https://aqueous-journey-97697.herokuapp.com/";

export const _axiosPostAPI = (url, params) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'POST',
                url: BASE_URL + url,
                data: params,
            })
                .then(async (response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                })
        } catch (error) {
            reject(error);
        }
    });
}

export const _axiosGetAPI1 = (url, params) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + url,
                method: 'GET',
                data: params,
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                })

        } catch (error) {
            reject(error);
        }
    });
}

export const _axiosPutAPI = (url, params) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'PUT',
                url: BASE_URL + url,
                data: params,
            })
                .then(async (response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                })
        } catch (error) {
            reject(error);
        }
    });
}
export const _axiosPutAPI1 = (url, params) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'PUT',
                headers: {
                    'Content-Type': `multipart/form-data`,
                },
                url: url,
                data: params,
            })
                .then(async (response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                })
        } catch (error) {
            reject(error);
        }
    });
}


export const _axiosGetAPI = (url) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + url,
                method: 'GET',
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                })

        } catch (error) {
            reject(error);
        }
    });
}
export const _axiosDeleteAPI = (url) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + url,
                method: 'DELETE',
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                })

        } catch (error) {
            reject(error);
        }
    });
}