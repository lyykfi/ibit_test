import * as fs from 'fs';
import * as path from 'path';

import Deal from './deal';

// routes
const routes: any = {};

// current filename
const currentFileName = __filename.split(/[\\/]/).pop();

// read routes
const files = fs.readdirSync(__dirname);

files.forEach((file) => {
    if (file !== currentFileName) {
        const fileNameSplited = file.split('.');
        const fileName = fileNameSplited[0];

        if (fileName) {
            routes[fileName] = require(`/${__dirname}${path.sep}${file}`);
        }
    }
});

// react router
routes['*'] = (req: Request, rs: Response) => {
    
};

export default routes;
