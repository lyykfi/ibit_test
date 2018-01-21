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
export function createDeal(value: number, date: Moment) {
    return async (dispatch: Dispatch<any>) => {
        const result = await fetch('/deal', {
            body: JSON.stringify({ value, date: date.format() }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
        });
        const resultJson = await result.json();

        dispatch(resultJson.success ? createDealSuccess(resultJson.deal) : createDealFail());
    };
}

/**
 * @function createDealSuccess
 */
function createDealSuccess(deal: IDeal) {
    return {
        payload: deal,
        type: Deal.ADD_SUCCESS,
    };
}

/**
 * @function createDealFail
 */
function createDealFail() {
    return {
        payload: DealErrors.UNKNOWN_ERROR,
        type: Deal.ADD_FAIL,
    };
}

/**
 * get deal list
 * @method getDealList
 */
export function getDealList(): object {
    console.log('get');
    return {};
}
