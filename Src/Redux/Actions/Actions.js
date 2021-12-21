import {
    SESSION,
    MARKET_DATA,
    MARKET_DATA_LOADING,
} from '../Constants'

import { _axiosPostAPI } from '../../Apis/Apis';


export const SetSession = (data) => {
    return {
        type: SESSION,
        payload: data,
    }
}

export const _getMarketData = (url, params) => {
    try {
        return async dispatch => {
            dispatch({ type: MARKET_DATA_LOADING, payload: true });
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
                    alert(JSON.stringify(err))
                })
        };
    } catch (error) {
        dispatch({ type: MARKET_DATA_LOADING, payload: false });
        alert(JSON.stringify(error))
    }
}
