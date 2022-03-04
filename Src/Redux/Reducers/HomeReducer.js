import {
    MARKET_DATA,
    MARKET_DATA_LOADING,
    TICKER_DATA,
    TICKER_DATA_LOADING,
    NEWS_DATA,
    MARKET_LIST,
    GET_SINGLE_MARKET,
    CREATE_ORDER,
    DEPOSITE_WITHDRAW_ORDER,
    ADD_ALERT_ORDER,
    CREATE_ORDER_LOADING,
    GET_ORDER,
    MARKET_NEWS,
    GET_ORDER_HISTORY,
    WATCHLIST_MARKETS,
    ALL_NOTIFICATIONS,
    ALL_ALERTS,
    GET_ASSETS,
    CHANGEPASSWORD_LOADING,
    CHANGEPASSWORD_MSG,
    DEPOSITE_MSG,
    LATEST_ALERTS,
    NOTIFICATION_LOADING,
    DEPOSITEWITHDRAW,
    CURRENCY_FACTOR,
    CURRENT_CURRENCY_FACTOR,
    TICKER_GRAPH_DATA,
    CREATE_CALL_REQ,
    ASSETS_DATA_LOADING,
    ORDER_DATA_LOADING,
    TRANSACTION_DATA_LOADING
} from '../Constants'
const initialState = {
    Market_Loading: false,
    Assets_Loading: false,
    Order_Loading: false,
    Transaction_Loading: false,
    Ticker_Loading: false,
    marketData: [],
    tickerData: [],
    newsData: [],
    marketList: [],
    singleMarketData: [],
    orderCreated: false,
    callReqCreated: false,
    Deposite_Withdraw_Created: false,
    add_Alert_Created: false,
    OrderLoading: false,
    Order_List: [],
    Order_List_History: [],
    Market_News: [],
    WatchListMarkets: [],
    Notifications: [],
    Alertss: [],
    AssetsDetails:'',
    ChangePasswordLoading:false,
    ChangePasswordMsg:'',
    Deposite_Msg:'',
    AlertsCount:'',
    Notification_Loading:false,
    TransationHistory:[],
    currencyRate:[],
    current_currency_rate:"",
    graphDataSet:[],
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
        case ASSETS_DATA_LOADING:
            return {
                ...state,
                Assets_Loading: payload,
            }
        case ORDER_DATA_LOADING:
            return {
                ...state,
                Order_Loading: payload,
            }
        case TRANSACTION_DATA_LOADING:
            return {
                ...state,
                Transaction_Loading: payload,
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
        case CREATE_CALL_REQ:
            return {
                ...state,
                callReqCreated: payload,
            }
        case DEPOSITE_WITHDRAW_ORDER:
            return {
                ...state,
                Deposite_Withdraw_Created: payload,
            }
        case ADD_ALERT_ORDER:
            return {
                ...state,
                add_Alert_Created: payload,
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
        case WATCHLIST_MARKETS:
            return {
                ...state,
                WatchListMarkets: payload,
            }
        case ALL_NOTIFICATIONS:
            return {
                ...state,
                Notifications: payload,
            }
        case ALL_ALERTS:
            return {
                ...state,
                Alertss: payload,
            }
        case GET_ASSETS:
            return {
                ...state,
                AssetsDetails: payload,
            }
        case CHANGEPASSWORD_LOADING:
            return {
                ...state,
                ChangePasswordLoading: payload,
            }
        case CHANGEPASSWORD_MSG:
            return {
                ...state,
                ChangePasswordMsg: payload,
            }
        case DEPOSITE_MSG:
            return {
                ...state,
                Deposite_Msg: payload,
            }
        case LATEST_ALERTS:
            return {
                ...state,
                AlertsCount: payload,
            }
        case NOTIFICATION_LOADING:
            return {
                ...state,
                Notification_Loading: payload,
            }
        case DEPOSITEWITHDRAW:
            return {
                ...state,
                TransationHistory: payload,
            }
        case CURRENCY_FACTOR:
            return {
                ...state,
                currencyRate: payload,
            }
        case CURRENT_CURRENCY_FACTOR:
            return {
                ...state,
                current_currency_rate: payload,
            }
        case TICKER_GRAPH_DATA:
            return {
                ...state,
                graphDataSet: payload,
            }
        default:
            return state;
    }

}
export default HomeReducer;