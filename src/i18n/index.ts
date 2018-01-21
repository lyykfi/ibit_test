import { Platforms } from 'constants/platforms';
import * as i18n from 'i18next';
import * as XHR from 'i18next-xhr-backend';
import { reactI18nextModule } from 'react-i18next';

export function getI18n() {
    i18n.use(reactI18nextModule);

    if (String(process.env.PLATFORM) === String(Platforms.BROWSER)) {
        i18n.use(XHR);
    } else {
        const Backend = require('i18next-node-fs-backend');
        i18n.use(Backend);
    }

    i18n.init({
        debug: true,
        fallbackLng: 'en',

        react: {
            wait: true,
        },
    });

    return i18n;
}
