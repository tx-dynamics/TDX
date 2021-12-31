import {
    SESSION,
    MARKET_DATA,
    MARKET_DATA_LOADING,
    TICKER_DATA,
    TICKER_DATA_LOADING,
    NEWS_DATA,
    MARKET_LIST,
    GET_SINGLE_MARKET,
    CREATE_ORDER,
    CREATE_ORDER_LOADING,
    GET_ORDER,
    GET_ORDER_HISTORY,
    MARKET_NEWS,
} from '../Constants'

import { _axiosPostAPI } from '../../Apis/Apis';

export const SetSession = (data) => {
    return {
        type: SESSION,
        payload: data,
    }
}

export const _checkLogin = (url, params) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {
                    // alert(JSON.stringify(response))
                    if (response.action === "success") {
                    } else {
                        let data = {}
                        data["isLogin"] = false;
                        data["userToken"] = "";
                        data["userId"] = "";
                        data["userInfo"] = "";
                        dispatch({ type: SESSION, payload: data });
                    }
                })
                .catch((err) => {
                    console.log(JSON.stringify(err))
                })
        };
    } catch (error) {
        console.log(JSON.stringify(error))
    }
}

export const _getSingleMarketData = (url, params) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {
                    if (response.action === "success") {
                        // alert(JSON.stringify(response.data))
                        dispatch({
                            type: GET_SINGLE_MARKET,
                            payload: response.data,
                        });
                    } else {
                        alert(JSON.stringify(response.error))
                    }
                })
                .catch((err) => {
                    dispatch({ type: MARKET_DATA_LOADING, payload: false });
                    console.log(JSON.stringify(err))
                })
        };
    } catch (error) {
        dispatch({ type: MARKET_DATA_LOADING, payload: false });
        console.log(JSON.stringify(error))
    }
}

export const _getMarketData = (url, params) => {
    try {
        return async dispatch => {
            // dispatch({ type: MARKET_DATA_LOADING, payload: true });
            // alert(JSON.stringify(params))

            await _axiosPostAPI(url, params)
                .then(async (response) => {
                    dispatch({ type: MARKET_DATA_LOADING, payload: false });
                    if (response.action === "success") {
                        // alert(JSON.stringify(response.data))
                        dispatch({
                            type: MARKET_DATA,
                            payload: response.data,
                        });
                    } else {
                        alert(JSON.stringify(response.error))
                    }
                })
                .catch((err) => {
                    dispatch({ type: MARKET_DATA_LOADING, payload: false });
                    console.log(JSON.stringify(err))
                })
        };
    } catch (error) {
        dispatch({ type: MARKET_DATA_LOADING, payload: false });
        console.log(JSON.stringify(error))
    }
}

export const _getTickerData = (url, params) => {
    try {
        return async dispatch => {
            dispatch({ type: TICKER_DATA_LOADING, payload: true });
            await _axiosPostAPI(url, params)
                .then(async (response) => {
                    dispatch({ type: TICKER_DATA_LOADING, payload: false });
                    // alert(JSON.stringify(response))
                    if (response.action === "success") {
                        dispatch({
                            type: TICKER_DATA,
                            payload: response.data,
                        });
                        // alert(JSON.stringify(response))
                    } else {
                        alert(JSON.stringify(response.error))
                    }
                })
                .catch((err) => {
                    dispatch({ type: TICKER_DATA_LOADING, payload: false });
                    console.log(JSON.stringify(err))
                })
        };
    } catch (error) {
        dispatch({ type: TICKER_DATA_LOADING, payload: false });
        console.log(JSON.stringify(error))
    }
}

export const _getNewsData = (url, params) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {
                    // alert(JSON.stringify(response))
                    if (response.action === "success") {
                        dispatch({
                            type: NEWS_DATA,
                            payload: response.data,
                        });
                        // alert(JSON.stringify(response))
                    } else {
                        alert(JSON.stringify(response.error))
                    }
                })
                .catch((err) => {
                    console.log(JSON.stringify(err))
                })
        };
    } catch (error) {
        console.log(JSON.stringify(error))
    }
}

export const _getMarketList = (url, params) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {
                    // alert(JSON.stringify(response))
                    if (response.action === "success") {
                        dispatch({
                            type: MARKET_LIST,
                            payload: response.data,
                        });
                        // alert(JSON.stringify(response))
                    } else {
                        alert(JSON.stringify(response.error))
                    }
                })
                .catch((err) => {
                    console.log(JSON.stringify(err))
                })
        };
    } catch (error) {
        console.log(JSON.stringify(error))
    }
}

export const _createOrder = (url, params) => {
    try {
        return async dispatch => {
            dispatch({ type: CREATE_ORDER_LOADING, payload: true });
            await _axiosPostAPI(url, params)
                .then(async (response) => {
                    dispatch({ type: CREATE_ORDER_LOADING, payload: false });
                    if (response.action === "success") {
                        // alert(JSON.stringify(response))
                        dispatch({ type: CREATE_ORDER, payload: true })
                    } else {
                        alert(JSON.stringify(response.error))
                    }
                })
                .catch((err) => {
                    dispatch({ type: CREATE_ORDER_LOADING, payload: false });
                    console.log(JSON.stringify(err))
                })
        };
    } catch (error) {
        dispatch({ type: CREATE_ORDER_LOADING, payload: false });
        console.log(JSON.stringify(error))
    }
}

export const _getOrders = (url, params) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {
                    if (response.action === "success") {
                        // alert(JSON.stringify(response))
                        dispatch({ type: GET_ORDER, payload: response.data.orders })
                    } else {
                        alert(JSON.stringify(response.error))
                    }
                })
                .catch((err) => {
                    console.log(JSON.stringify(err))
                })
        };
    } catch (error) {
        console.log(JSON.stringify(error))
    }
}

export const _getOrdersHistory = (url, params) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {
                    if (response.action === "success") {
                        // alert(JSON.stringify(response))
                        dispatch({ type: GET_ORDER_HISTORY, payload: response.data.orders })
                    } else {
                        alert(JSON.stringify(response.error))
                    }
                })
                .catch((err) => {
                    console.log(JSON.stringify(err))
                })
        };
    } catch (error) {
        console.log(JSON.stringify(error))
    }
}

export const _getMarketNews = (url, params) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {
                    if (response.action === "success") {
                        dispatch({ type: MARKET_NEWS, payload: response.data.infos })
                    } else {
                        alert(JSON.stringify(response.error))
                    }
                })
                .catch((err) => {
                    console.log(JSON.stringify(err))
                })
        };
    } catch (error) {
        console.log(JSON.stringify(error))
    }
}
