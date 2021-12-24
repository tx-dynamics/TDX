import {
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
    MARKET_NEWS,
    GET_ORDER_HISTORY
} from '../Constants'
const initialState = {
    Market_Loading: false,
    Ticker_Loading: false,
    marketData: [],
    tickerData: [],
    newsData: [],
    marketList: [],
    singleMarketData: [],
    orderCreated: false,
    OrderLoading: false,
    Order_List: [],
    Order_List_History: [],
    Market_News: [],
};

const HomeReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case MARKET_DATA:
            return {
                ...state,
                marketData: payload,
            }
        case MARKET_DATA_LOADING:
            return {
                ...state,
                Market_Loading: payload,
            }
        case TICKER_DATA:
            return {
                ...state,
                tickerData: payload,
            }
        case TICKER_DATA_LOADING:
            return {
                ...state,
                Ticker_Loading: payload,
            }
        case NEWS_DATA:
            return {
                ...state,
                newsData: payload,
            }
        case MARKET_LIST:
            return {
                ...state,
                marketList: payload,
            }
        case GET_SINGLE_MARKET:
            return {
                ...state,
                singleMarketData: payload,
            }
        case CREATE_ORDER:
            return {
                ...state,
                orderCreated: payload,
            }
        case CREATE_ORDER_LOADING:
            return {
                ...state,
                OrderLoading: payload,
            }
        case GET_ORDER:
            return {
                ...state,
                Order_List: payload,
            }
        case GET_ORDER_HISTORY:
            return {
                ...state,
                Order_List_History: payload,
            }
        case MARKET_NEWS:
            return {
                ...state,
                Market_News: payload,
            }
        default:
            return state;
    }

}
export default HomeReducer;