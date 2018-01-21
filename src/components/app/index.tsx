import Router from 'components/router/index';
import { Platforms } from 'constants/platforms';
import { getI18n } from 'i18n/index';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import {createNewStore } from 'store/index';

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

        return <I18nextProvider i18n={getI18n()}>
            <Provider store={createNewStore()}>
                <Router context={context} url={url} />
            </Provider>
        </I18nextProvider>;
    }
}
