import { Platforms } from 'constants/platforms';
import * as React from 'react';
import { BrowserRouter, Route, StaticRouter, Switch } from 'react-router-dom';
import routesList from './list';

/**
 * props
 */
interface IProps {
    url?: string;
    context?: object;
}

/**
 * router class
 * @class Router
 */
export default class Router extends React.Component<IProps, {}> {
    /**
     * @method render
     */
    public render() {
        const { url, context } = this.props;
        const RouterComponent = String(process.env.PLATFORM) === String(Platforms.BROWSER) ? BrowserRouter : StaticRouter;
        console.log(url);
        return <RouterComponent context={context} location={url}>
            <Switch>
                {routesList.map((item) => <Route key={item.path} {...item} />)}
            </Switch>
        </RouterComponent>;
    }
}
