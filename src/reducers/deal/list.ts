import { Deal } from 'constants/deal';

const initialState = null;

export default function dealList(state = null, action: any) {
    switch (action.type) {
        case Deal.GET_LIST_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
