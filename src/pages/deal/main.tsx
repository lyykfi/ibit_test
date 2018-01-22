import DealList from 'components/deal/list';
import Footer from 'components/footer/index';
import Header from 'components/header/index';
import Router from 'components/router/index';
import { Platforms } from 'constants/platforms';
import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { Link } from 'react-router-dom';

interface IProps extends InjectedTranslateProps {}

/**
 * deal main page class
 * @class App
 */
class DealMainPage extends React.Component<IProps, {}> {
    /**
     * @method render
     */
    public render(): JSX.Element {
        return <div className='root_inner'>
            <div className='wrapper'>
                <Header buttonRender={this.renderNewDealButton} />
                <DealList />
            </div>
            <Footer />
        </div>;
    }

    /**
     * @method renderNewDealButton
     */
    private renderNewDealButton = (): JSX.Element => {
        return <Link to='/add' className='button'>{this.props.t('deal.buttons.new')}</Link>;
    }
}

export default translate()(DealMainPage);
