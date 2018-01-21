var scanner = require('i18next-scanner');
var vfs = require('vinyl-fs');
var options = {
    debug: true,
    trans: {
        extensions: ['.ts', '.tsx']
    },
    func: {
        list: ['t'],
        extensions: ['.ts', '.tsx']
    },
    resource: {
        loadPath: '{{lng}}/{{ns}}.json',
        savePath: '{{lng}}/{{ns}}.json',
        jsonIndent: 2,
        lineEnding: '\n'
    },
};

vfs.src(['../**/*.tsx'], ['../**/*.ts'])
    .pipe(scanner(options))
    .pipe(vfs.dest('./locales'));