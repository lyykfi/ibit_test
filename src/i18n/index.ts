import { Platforms } from 'constants/platforms';
import * as i18n from 'i18next';
import * as XHR from 'i18next-xhr-backend';
import { reactI18nextModule } from 'react-i18next';

export function getI18n() {
    const instance = i18n.use(reactI18nextModule);
    const backendOptions: any = {};
    const reactOptions = {
        wait: false,
    };

    if (String(process.env.PLATFORM) === String(Platforms.BROWSER)) {
        instance.use(XHR);
        reactOptions.wait = true;
    } else {
        const Backend = require('i18next-sync-fs-backend');
        instance.use(Backend);

        backendOptions.loadPath = process.cwd() + '/locales/{{lng}}/{{ns}}.json';
    }

    instance.init({
        backend: backendOptions,
        debug: true,
        defaultNS: 'translation',
        fallbackLng: 'en',
        initImmediate: false,
        ns: ['translation'],
        react: reactOptions,
    });

    return instance;
}
