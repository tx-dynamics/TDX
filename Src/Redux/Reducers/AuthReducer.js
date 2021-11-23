import {
    SESSION,
    SIGNUP_LOADING,
    SIGNUP_LOADING_FALSE
} from '../Constants'
const initialState = {
    userId: '',
    isLogin: '',
    userToken: '',
    userInfo: '',
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    // console.warn(payload)
    switch (type) {
        case SESSION:
            return {
                ...state,
                userId: payload.userId,
                isLogin: payload.isLogin,
                userToken: payload.userToken,
                userInfo: payload.userInfo,
            }
        default:
            return state;
    }

}
export default authReducer