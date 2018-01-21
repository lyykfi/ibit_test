import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import './style.less';

interface IProps extends InjectedTranslateProps {
    buttonRender?: () => JSX.Element;
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
        const {t, buttonRender} = this.props;
        const button = buttonRender ? buttonRender() : null;

        return <header>
            <p>{t('title')}</p>
            {button ? <div className='button'>{button}</div> : null}
        </header>;
    }
}

export default translate()(Header);
