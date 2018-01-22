import { Currencies } from 'constants/currencies';
import * as moment from 'moment';
import * as React from 'react';

import { IDeal } from 'models/deal';
import DealListTable from './table/index';

import { getDealList } from 'actions/deal/list';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * props
 */
interface IProps {
    deals?: IDeal[];
    getDealList?: () => void;
}

/**
 * create new deal
 * @class NewDealForm
 */
@(connect(
    (state: any) => {
        return {
            deals: state.DealListReducer,
        };
    },
    (dispatch) => ({
        getDealList: bindActionCreators(getDealList, dispatch),
    }),
) as any)
export default class DealList extends React.Component<IProps> {

    /**
     * @method render
     */
    public render(): React.ReactNode {
        return <DealListTable deals={this.props.deals || []} />;
    }

    /**
     * @method componentDidMount
     */
    public componentDidMount() {
        if (this.props.getDealList) {
            this.props.getDealList();
        }
    }
}
