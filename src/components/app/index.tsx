import Router from 'components/router/index';
import { Platforms } from 'constants/platforms';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';

import { getI18n } from 'i18n/index';

import './style.less';

/**
 * props
 */
interface IProps {
    url?: string;
    context?: object;
}

/**
 * root class
 * @class App
 */
export default class App extends React.Component<IProps, {}> {
    /**
     * @method render
     */
    public render() {
        const { url, context } = this.props;

        return <Router context={context} url={url}>
            <I18nextProvider i18n={getI18n()}>
                <h1>hello world</h1>
            </I18nextProvider>
        </Router>;
    }
}
