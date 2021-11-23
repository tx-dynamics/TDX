import { ADD_HABBIT, START_DATE } from '../Constants'
const initialState = {
    habbitName: '',
    setTarget: '',
    ChallengestartDate:'',
    ChallengeEndDate:'',
    ChallengeId:''
};

const HomeReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_HABBIT:
            return {
                ...state,
                habbitName: payload.habbitName,
                setTarget: payload.setTarget,
            }
        case START_DATE:
            return {
                ...state,
                ChallengestartDate: payload.ChallengestartDate,
                ChallengeEndDate: payload.ChallengeEndDate,
                ChallengeId: payload.ChallengeId,
            }
        default:
            return state;
    }

}
export default HomeReducer;