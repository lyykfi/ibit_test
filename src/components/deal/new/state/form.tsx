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
    value: string;
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
            value: '',
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
                <h2>{t('deal.new.title')}</h2>
                <p className='date'>{formatedDate}</p>
            </div>

            <div className='inner'>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label>{t('deal.new.form.current_date')}</label>
                        <input type='text' value={formatedDate} />
                    </p>
                    <p>
                        <label>{t('deal.new.form.value')}</label>
                        <input type='text' value={Currencies.USD} disabled={true} />
                        <input type='text' value={this.state.value} onChange={this.handleChangeValue} autoFocus={true} />
                    </p>
                    <p>
                        <button type='submit'>{t('deal.buttons.new')}</button>
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
            this.props.createDeal(parseInt(this.state.value, 10), this.state.currentDate);
        }

        event.preventDefault();
        return false;
    }
}

export default translate()(NewDealFormStateForm);
