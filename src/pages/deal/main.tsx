import Header from 'components/header/index';
import Router from 'components/router/index';
import { Platforms } from 'constants/platforms';
import * as React from 'react';

/**
 * deal main page class
 * @class App
 */
export default class DealMainPage extends React.Component<{}, {}> {
    /**
     * @method render
     */
    public render() {
        return <div>
            <Header />
        </div>;
    }
}
