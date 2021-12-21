import { MARKET_DATA,
    MARKET_DATA_LOADING, } from '../Constants'
const initialState = {
    Market_Loading: false,
    marketData: [],
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
        default:
            return state;
    }

}
export default HomeReducer;