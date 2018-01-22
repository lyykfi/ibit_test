import { getDealList } from 'actions/deal/list';
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
export function deleteDeal(id: string) {
    return async (dispatch: Dispatch<any>) => {
        const result = await fetch(`/deal/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
        });
        const resultJson = await result.json();

        dispatch(resultJson.success ? deleteDealSuccess() : deleteDealSuccess());
        dispatch(getDealList());
    };
}

/**
 * @function deleteDealSuccess
 */
export function deleteDealSuccess() {
    return {
        type: Deal.DELETE_SUCCESS,
    };
}

/**
 * @function deleteDealFail
 */
export function deleteDealFail() {
    return {
        payload: DealErrors.UNKNOWN_ERROR,
        type: Deal.DELETE_FAIL,
    };
}
