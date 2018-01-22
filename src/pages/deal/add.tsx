import NewDealForm from 'components/deal/new';
import Footer from 'components/footer/index';
import Header from 'components/header/index';
import Router from 'components/router/index';
import { Platforms } from 'constants/platforms';
import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { Link } from 'react-router-dom';

interface IProps extends InjectedTranslateProps {}

/**
 * deal add page class
 * @class DealAddPage
 */
class DealAddPage extends React.Component<IProps, {}> {
    /**
     * @method render
     */
    public render(): JSX.Element {
        return <div className='root_inner'>
            <div className='wrapper'>
                <Header buttonRender={this.renderBackButton} />
                <NewDealForm />
            </div>
            <Footer />
        </div>;
    }

    /**
     * @method renderBackButton
     */
    private renderBackButton = (): JSX.Element => {
        return <Link to='/' className='button'>{this.props.t('deal.buttons.back')}</Link>;
    }
}

export default translate()(DealAddPage);
