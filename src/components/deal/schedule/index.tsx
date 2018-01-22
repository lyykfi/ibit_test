import { Currencies } from 'constants/currencies';
import * as moment from 'moment';
import * as React from 'react';

import { IDeal } from 'models/deal';

import { getDealList } from 'actions/deal/list';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DealScheduleView from './view';

import './style.less';

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
export default class DealSchedule extends React.Component<IProps> {
    /**
     * time graph limit
     */
    private TIME_LIMIT = 600000;

    /**
     * @method render
     */
    public render(): React.ReactNode {
        const deals: any = [];

        if (this.props.deals) {
           this.props.deals.forEach((item) => {
                if (moment().diff(moment(item.date)) <= this.TIME_LIMIT) {
                    deals.push(item);
                }
            });
        }

        return <DealScheduleView deals={deals || []} />;
    }

    /**
     * @method componentDidMount
     */
    public componentDidMount() {
        if (this.props.deals &&
            this.props.getDealList &&
            this.props.deals.length === 0) {
            this.props.getDealList();
        }
    }
}
