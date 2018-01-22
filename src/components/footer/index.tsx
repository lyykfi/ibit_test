import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import './style.less';

/**
 * props
 */
interface IProps extends InjectedTranslateProps {}

/**
 * deal main page class
 * @class Footer
 */
class Footer extends React.Component<IProps, {}> {

    /**
     * @method render
     */
    public render(): React.ReactNode {
        const {t} = this.props;

        return <footer>
            <p className='title'>{t('title')}</p>
            <p className='copyright'>{t('copyright')}</p>
        </footer>;
    }
}

export default translate()(Footer);
