import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import routes from './routes/index';

/**
 * @class AppServer
 */
class AppServer {
    /**
     * Express app
     */
    public express: express.Application;

    /**
     * app port
     */
    public port: number;

    /**
     * @constructor
     */
    constructor(port: number = 3100) {
        this.port = port;

        this.express = express();

        this.setPlugins();
        this.setStatic();
        this.mountRoutes();
    }

    /**
     * run server
     * @method run
     */
    public run(): void {
        this.express.listen(this.port, () => {
            console.log(`I'm there - port ${this.port}`);
        });
    }

    /**
     * @method setStatic
     */
    private setStatic(): void {
        this.express.use('/assets', express.static(path.join(process.cwd(), 'build', 'assets')));
        this.express.use('/locales', express.static(path.join(process.cwd(), 'locales')));
    }

    /**
     * @method setPlugins
     */
    private setPlugins(): void {
        this.express.use(bodyParser.json());
    }

    /**
     * @method mountRoutes
     */
    private mountRoutes(): void {
        Object.keys(routes).forEach((key: string) => {
            this.express.use(key, routes[key]);
        });
    }
}

export default AppServer;
