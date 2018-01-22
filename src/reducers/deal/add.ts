import { Deal } from 'constants/deal';

const initialState = null;

export default function dealAdd(state = null, action: any) {
    switch (action.type) {
        case Deal.ADD_SUCCESS:
            const deal = action.payload;
            deal.value = parseInt(deal.value, 10);

            return deal;
        case Deal.ADD_CLEAR:
            return null;
        default:
            return state;
    }
}
