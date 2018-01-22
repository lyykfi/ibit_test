import { Currencies } from 'constants/currencies';
import * as moment from 'moment';
import * as React from 'react';

import { IDeal } from 'models/deal';
import NewDealFormStateForm from './state/form';
import NewDealFormStateSuccess from './state/success';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.less';

/**
 * form states
 */
enum NewDealFormStates {
    FORM,
    SUCCESS,
}

/**
 * props
 */
interface IProps {
    formState: NewDealFormStates;
}

/**
 * create new deal
 * @class NewDealForm
 */
@(connect(
    (state: any) => {
        return {
            formState: state.DealAddReducer ? NewDealFormStates.SUCCESS : NewDealFormStates.FORM,
        };
    },
) as any)
export default class NewDealForm extends React.Component<Partial<IProps>> {
    /**
     * @constructor
     * @param props
     */
    constructor(props: IProps) {
        super(props);

        this.state = {
            formState: NewDealFormStates.FORM,
        };
    }

    /**
     * @method render
     */
    public render(): React.ReactNode {
        const { formState } = this.props;

        if (formState === NewDealFormStates.SUCCESS) {
            return <NewDealFormStateSuccess />;
        }

        return <NewDealFormStateForm />;
    }
}
