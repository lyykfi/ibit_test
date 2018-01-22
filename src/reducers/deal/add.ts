import { Deal } from 'constants/deal';

const initialState = null;

export default function dealAdd(state = null, action: any) {
    switch (action.type) {
        case Deal.ADD_SUCCESS:
            return action.payload;
        case Deal.ADD_CLEAR:
            return null;
        default:
            return state;
    }
}
