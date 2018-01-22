import * as moment from 'moment';
import * as React from 'react';

import { deleteDeal } from 'actions/deal/delete';
import { IDeal } from 'models/deal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * props
 */
interface IProps {
    deal: IDeal;
    deleteDeal: (id: string) => void;
}

/**
 * view of deal list row
 * @class DealListTableRow
 */
@(connect(
    (state: any) => {
        return {
            deals: state.DealListReducer,
        };
    },
    (dispatch) => ({
        deleteDeal: bindActionCreators(deleteDeal, dispatch),
    }),
) as any)
export default class DealListTableRow extends React.Component<Partial<IProps>> {
    /**
     * @method render
     */
    public render(): React.ReactNode {
        const { deal } = this.props;

        return deal ? <tr>
            <td>{deal.id}</td>
            <td>{deal.date}</td>
            <td>{deal.value}</td>
            <td>
                <span className='delete' onClick={this.handleDeleteClick}>del</span>
            </td>
        </tr> : null;
    }

    /**
     * @method handleDeleteClick
     */
    private handleDeleteClick = () => {
        if (this.props.deleteDeal && this.props.deal) {
            this.props.deleteDeal(this.props.deal.id);
        }
    }
}
