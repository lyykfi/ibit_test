import { Deal } from 'constants/deal';

const initialState = null;

export default function dealAdd(state = null, action: any) {
    console.log('2');
    switch (action.type) {
        case Deal.ADD_SUCCESS:
            console.log(action);
            return action.payload;
        default:
            return state;
    }
}
