import { createDeal } from 'actions/deal';
import { Currencies } from 'constants/currencies';
import * as moment from 'moment';
import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * props
 */
interface IProps extends InjectedTranslateProps {
    createDeal?: (value: number, date: moment.Moment) => void;
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
    null,
    (dispatch) => ({
        createDeal: bindActionCreators(createDeal, dispatch),
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
        const {t} = this.props;
        const formatedDate = this.state.currentDate.format('MMMM Do YYYY, h:mm:ss a');

        return <div className='box'>
            <div className='title'>
                <h2>{t('deal.new.success.title')}</h2>
                <p className='date'>{formatedDate}</p>
            </div>

            <div className='inner'>
                <div className='success'>123</div>
            </div>

            <div className='button'>OK</div>
        </div>;
    }
}

export default translate()(NewDealFormStateSuccess);
