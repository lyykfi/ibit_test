import { createDeal } from 'actions/deal/add';
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
    value: number;
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
class NewDealFormStateForm extends React.Component<IProps, IState> {
    /**
     * @constructor
     * @param props
     */
    constructor(props: IProps) {
        super(props);

        this.state = {
            currentDate: moment(),
            value: 1,
        };
    }

    /**
     * @method render
     */
    public render(): React.ReactNode {
        const {t} = this.props;
        const formatedDate = this.state.currentDate.format('MMMM Do YYYY, h:mm:ss a');

        return <div className='box deal_new'>
            <div className='title'>
                <h2>{t('deal.new.title')}</h2>
                <p className='date'>{formatedDate}</p>
            </div>

            <div className='inner'>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label>{t('deal.new.form.current_date')}</label>
                        <input type='text' value={formatedDate} className='date' />
                    </p>
                    <p>
                        <label>{t('deal.new.form.value')}</label>
                        <input type='text' value={Currencies.USD} disabled={true} className='currencies' />
                        <input min='1' type='number' value={this.state.value} onChange={this.handleChangeValue} autoFocus={true} className='value' />
                    </p>
                    <p>
                        <button type='submit' className='button'>{t('deal.buttons.new')}</button>
                    </p>
                </form>
            </div>
        </div>;
    }

    /**
     * @method handleChangeValue
     */
    private handleChangeValue = (event: any) => {
        this.setState({
            value: event.currentTarget.value,
        });
    }

    /**
     * @method handleSubmit
     */
    private handleSubmit = (event: any) => {
        if (this.props.createDeal) {
            this.props.createDeal(this.state.value, this.state.currentDate);
        }

        event.preventDefault();
        return false;
    }
}

export default translate()(NewDealFormStateForm);
