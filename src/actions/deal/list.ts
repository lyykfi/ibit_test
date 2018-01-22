import { Deal } from 'constants/deal';
import { IDeal } from 'models/deal';
import { Moment } from 'moment';
import { Dispatch } from 'react-redux';

/**
 * errors
 */
enum DealErrors {
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * create deal
 * @param value number
 */
export function getDealList() {
    return async (dispatch: Dispatch<any>) => {
        const result = await fetch('/deal', {
            method: 'GET',
        });
        const resultJson = await result.json();

        dispatch(resultJson.success ? getDealListSuccess(resultJson.deals) : getDealListFail());
    };
}

/**
 * @function getDealListSuccess
 */
export function getDealListSuccess(deals: IDeal[]) {
    return {
        payload: deals,
        type: Deal.GET_LIST_SUCCESS,
    };
}

/**
 * @function getDealListFail
 */
export function getDealListFail() {
    return {
        payload: DealErrors.UNKNOWN_ERROR,
        type: Deal.GET_LIST_FAIL,
    };
}
