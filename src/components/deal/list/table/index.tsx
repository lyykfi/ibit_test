import * as moment from 'moment';
import * as React from 'react';

import { IDeal } from 'models/deal';

import DealListTableRow from 'components/deal/list/table/row';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.less';

/**
 * default props
 */
interface IProps extends InjectedTranslateProps {
    deals: IDeal[];
}

/**
 * view of deal list
 * @class DealListTable
 */
@(translate() as any)
export default class DealListTable extends React.Component<Partial<IProps>> {

    /**
     * @method render
     */
    public render(): React.ReactNode {
        const {t, deals} = this.props;

        return deals && t ? <div className='deals'>
            <div className='title'>
                <h2>{t('deal.list.title')}</h2>
                <p className='count'>{deals.length}</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>{t('deal.list.table.id')}</th>
                        <th>{t('deal.list.table.date')}</th>
                        <th>{t('deal.list.table.value')}</th>
                        <th>{null}</th>
                    </tr>
                </thead>
                <tbody>
                    {deals.map((item) => <DealListTableRow key={item.id} deal={item} />)}
                </tbody>
            </table>
        </div> : null;
    }
}
