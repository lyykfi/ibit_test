import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';

import * as Mustache from 'mustache';
import * as ReactDOMServer from 'react-dom/server';
import * as template from '../templates/index.html';
import Deal from './deal';

import App from 'components/app/index';

// routes
const routes: any = {
    '/deal': Deal,
    // tslint:disable-next-line:object-literal-sort-keys
    '*': (req: Request, res: any) => {
        const stats: any = require('../../../build/assets/stats.json');
        const context = {};

        const js: any = [];
        const css: any = [];

        stats.assetsByChunkName.main.forEach((item: string) => {
            const itemSplited = item.split('.');
            const ext = itemSplited[itemSplited.length - 1];

            if (ext === 'css') {
                css.push({ src: item });
            }

            if (ext === 'js') {
                js.push({ src: item });
            }
        });

        res.send(Mustache.render(String(template), {
            body: ReactDOMServer.renderToString(<App  context={context} url={req.url} />),
            css,
            js,
        }));
    },
};

export default routes;
