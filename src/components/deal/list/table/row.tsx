import * as moment from 'moment';
import * as React from 'react';

import { deleteDeal } from 'actions/deal/delete';
import { IDeal } from 'models/deal';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * props
 */
interface IProps extends InjectedTranslateProps {
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
@(translate() as any)
export default class DealListTableRow extends React.Component<Partial<IProps>> {
    /**
     * @method render
     */
    public render(): React.ReactNode {
        const { deal } = this.props;

        return deal ? <tr>
            <td>{deal.id}</td>
            <td>{moment(deal.date).format('MMMM Do YYYY, h:mm:ss a')}</td>
            <td>{deal.value}</td>
            <td>
                <i className='delete fa fa-times' onClick={this.handleDeleteClick}>{null}</i>
            </td>
        </tr> : null;
    }

    /**
     * @method handleDeleteClick
     */
    private handleDeleteClick = () => {
        if (this.props.t && confirm(this.props.t('deal.list.delete'))) {
            if (this.props.deleteDeal && this.props.deal) {
                this.props.deleteDeal(this.props.deal.id);
            }
        }
    }
}
