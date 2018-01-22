import { createDealClear } from 'actions/deal/add';
import { Currencies } from 'constants/currencies';
import { IDeal } from 'models/deal';
import * as moment from 'moment';
import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * props
 */
interface IProps extends InjectedTranslateProps {
    createDealClear?: () => void;
    deal?: IDeal;
}

/**
 * state
 */
interface IState {
    currentDate: moment.Moment;
}

/**
 * create new deal
 * @class NewDealForm
 */
@(connect(
    (state: any) => {
        return {
            deal: state.DealAddReducer,
        };
    },
    (dispatch) => ({
        createDealClear: bindActionCreators(createDealClear, dispatch),
    }),
) as any)
class NewDealFormStateSuccess extends React.Component<IProps, IState> {
    /**
     * @constructor
     * @param props
     */
    constructor(props: IProps) {
        super(props);

        this.state = {
            currentDate: moment(),
        };
    }

    /**
     * @method render
     */
    public render(): React.ReactNode {
        const {t, deal} = this.props;
        const formatedDate = deal ? moment(deal.date).format('MMMM Do YYYY, h:mm:ss a') : '';

        return deal ? <div className='box'>
            <div className='title'>
                <h2>{t('deal.new.success.title')}</h2>
                <p className='date'>{deal.date}</p>
            </div>

            <div className='inner'>
                <div className='success'>{deal.value}</div>
            </div>

            <div className='button' onClick={this.handleClickOk}>OK</div>
        </div> : null;
    }

    /**
     * @method handleClickOk
     */
    private handleClickOk = () => {
        if (this.props.createDealClear) {
            this.props.createDealClear();
        }
    }
}

export default translate()(NewDealFormStateSuccess);
