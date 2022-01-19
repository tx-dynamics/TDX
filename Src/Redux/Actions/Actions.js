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
    WATCHLIST_MARKETS,
    ALL_NOTIFICATIONS,
    ALL_ALERTS,
    GET_ASSETS,
    CHANGEPASSWORD_LOADING,
    CHANGEPASSWORD_MSG,
    DEPOSITE_MSG,
    LATEST_ALERTS,
    NOTIFICATION_LOADING,
    DEPOSITEWITHDRAW
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

export const _sendPushNotification = (url, params) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {
                    if (response.action === "success") {
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
                        // console.log("ressssssssssssss ",JSON.stringify(response.data))
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

export const _addAlert = (url, params) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {
                    if (response.action === "success") {
                        alert(JSON.stringify(response.action))
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

export const _addToWishList = (url, params, token) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {
                    if (response.action === "success") {
                        // alert(JSON.stringify(response.action))
                        let data = {}
                        data["token"] = token;
                        await dispatch(_getAllWatchList('get_watchlist', data))
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

export const _changePasssword = (url, params) => {
    try {
        return async dispatch => {
            dispatch({ type: CHANGEPASSWORD_LOADING, payload: true });
            await _axiosPostAPI(url, params)
                .then(async (response) => {
                    dispatch({ type: CHANGEPASSWORD_LOADING, payload: false });
                    if (response.action === "success") {
                        // alert(JSON.stringify(response))
                        dispatch({ type: CHANGEPASSWORD_MSG, payload: "Password Changed" });
                    } else {
                        dispatch({ type: CHANGEPASSWORD_MSG, payload: response.error });
                        // alert(JSON.stringify(response.error))
                    }
                })
                .catch((err) => {
                    dispatch({ type: CHANGEPASSWORD_LOADING, payload: false });
                    console.log(JSON.stringify(err))
                })
        };
    } catch (error) {
        dispatch({ type: CHANGEPASSWORD_LOADING, payload: false });
        console.log(JSON.stringify(error))
    }
}

export const _removeNotification = (url, params, token) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {

                    if (response.action === "success") {
                        // alert(JSON.stringify(response))
                        let data = {}
                        data["token"] = token;
                        dispatch(_getNotification('get_notifications', data))
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

export const _getAssets = (url, params) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {

                    if (response.action === "success") {
                        // alert(JSON.stringify(response))
                        dispatch({
                            type: GET_ASSETS,
                            payload: response?.data,
                        });
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

export const _postTransaction = (url, params) => {
    try {
        return async dispatch => {
            dispatch({ type: CHANGEPASSWORD_LOADING, payload: true });
            await _axiosPostAPI(url, params)
                .then(async (response) => {
                    dispatch({ type: CHANGEPASSWORD_LOADING, payload: false });
                    if (response.action === "success") {
                        // dispatch({ type: DEPOSITE_MSG, payload: response.action });
                        alert(JSON.stringify(response.action))
                    } else {
                        // dispatch({ type: DEPOSITE_MSG, payload: response.error });
                        alert(JSON.stringify(response.error))
                    }
                })
                .catch((err) => {
                    console.log(JSON.stringify(err))
                    dispatch({ type: CHANGEPASSWORD_LOADING, payload: false });
                })
        };
    } catch (error) {
        dispatch({ type: CHANGEPASSWORD_LOADING, payload: false });
        console.log(JSON.stringify(error))
    }
}

export const _getDepositeWithdraw = (url, params) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {

                    if (response.action === "success") {
                        // alert(JSON.stringify(response))
                        dispatch({
                            type: DEPOSITEWITHDRAW,
                            payload: response?.transactions,
                        });
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

export const _getNotification = (url, params) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {

                    if (response.action === "success") {
                        // alert(JSON.stringify(response))
                        dispatch({
                            type: ALL_NOTIFICATIONS,
                            payload: response?.notifications,
                        });
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

export const _updateNotificaion = (url, params, token) => {
    try {
        return async dispatch => {
            dispatch({ type: NOTIFICATION_LOADING, payload: true });

            await _axiosPostAPI(url, params)
                .then(async (response) => {
                    dispatch({ type: NOTIFICATION_LOADING, payload: false });
                    if (response.action === "success") {
                        let data = {}
                        data["isLogin"] = true;
                        data["userToken"] = token;
                        data["userId"] = response?.data?.id;
                        data["userInfo"] = response?.data;
                        dispatch({
                            type: SESSION,
                            payload: data,
                        });
                        
                    } else {
                        alert(JSON.stringify(response.error))
                    }
                })
                .catch((err) => {
                    dispatch({ type: NOTIFICATION_LOADING, payload: false });
                    console.log(JSON.stringify(err))
                })
        };
    } catch (error) {
        dispatch({ type: NOTIFICATION_LOADING, payload: false });
        console.log(JSON.stringify(error))
    }
}

export const _updateCurrency = (url, params, token) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {

                    if (response.action === "success") {
                        // alert(JSON.stringify(response.data.id))
                        let data = {}
                        data["isLogin"] = true;
                        data["userToken"] = token;
                        data["userId"] = response?.data?.id;
                        data["userInfo"] = response?.data;
                        dispatch({
                            type: SESSION,
                            payload: data,
                        });
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

export const _getLatestAlerts = (url, params) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {

                    if (response.action === "success") {
                        // alert(JSON.stringify(response?.data?.alerts?.length))
                        dispatch({
                            type: LATEST_ALERTS,
                            payload: response?.data?.alerts?.length,
                        });
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

export const _removeAlert = (url, params, token) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {

                    if (response.action === "success") {
                        // alert(JSON.stringify(response))
                        let data = {}
                        data["token"] = token;
                        dispatch(_getAlerts('get_alerts', data))
                        
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

export const _getAlerts = (url, params) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {

                    if (response.action === "success") {
                        // alert(JSON.stringify(response))
                        dispatch({
                            type: ALL_ALERTS,
                            payload: response?.data?.alerts,
                        });
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

export const _getAllWatchList = (url, params) => {
    try {
        return async dispatch => {
            await _axiosPostAPI(url, params)
                .then(async (response) => {
                    if (response.action === "success") {
                        dispatch({
                            type: WATCHLIST_MARKETS,
                            payload: response?.data?.markets,
                        });
                        // alert(JSON.stringify(response?.data?.markets))
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
