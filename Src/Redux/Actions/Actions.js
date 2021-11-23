import {
    SESSION,
    SIGNUP_LOADING,
    SIGNUP_LOADING_FALSE
} from '../Constants'

export const SetSession = (data) => {
    return {
        type: SESSION,
        payload: data,
    }
}
