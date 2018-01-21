import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import './style.less';

interface IProps extends InjectedTranslateProps {
    buttonRender: () => void;
}

/**
 * deal main page class
 * @class Header
 */
class Header extends React.Component<IProps, {}> {

    /**
     * @method render
     */
    public render(): React.ReactNode {
        const {t} = this.props;

        return <header>
            <p>{t('title')}</p>
            <div className='button'>
            </div>
        </header>;
    }
}

export default translate()(Header);
