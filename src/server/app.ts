import * as express from 'express';
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
        this.mountRoutes();
    }

    /**
     * run server
     * @method run
     */
    public run(): void {
        this.express.listen(this.port);
    }

    /**
     * @method mountRoutes
     */
    private mountRoutes(): void {
        console.log(routes);
    }
}

export default AppServer;
