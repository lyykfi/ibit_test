import { createDealClear } from 'actions/deal/add';
import { Currencies } from 'constants/currencies';
import { IDeal } from 'models/deal';
import * as moment from 'moment';
import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

/**
 * props
 */
interface IProps extends InjectedTranslateProps {
    createDealClear?: () => void;
    history?: any;
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
@(withRouter as any)
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

        return deal ? <div className='box deal_new_success'>
            <div className='title'>
                <h2>{t('deal.new.success.title')}</h2>
                <p className='date'>{formatedDate}</p>
            </div>

            <div className='inner'>
                <i className='fa fa-check-circle-o' aria-hidden='true'>{null}</i>
                <div className='success'>{Currencies.USD} {deal.value.toFixed(2)}</div>
            </div>

            <div className='next'>
                <div className='button' onClick={this.handleClickOk}>OK</div>
            </div>
        </div> : null;
    }

    /**
     * @method handleClickOk
     */
    private handleClickOk = () => {
        if (this.props.createDealClear) {
            this.props.createDealClear();
        }

        if (this.props.history) {
            this.props.history.push('/');
        }
    }
}

export default translate()(NewDealFormStateSuccess);
