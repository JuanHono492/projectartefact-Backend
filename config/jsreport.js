const jsreport = require('jsreport')({
    extensions: {
        'chrome-pdf': {
            launchOptions: {
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }
        },
        'handlebars': {},
        'assets': {},
        'xlsx': {},
        'html-to-xlsx': {},
        'pdf-utils': {}
    }
});

let initialized = false;

async function getJsreportInstance() {
    if (!initialized) {
        await jsreport.init();
        initialized = true;
        console.log('jsreport inicializado correctamente');
    }
    return jsreport;
}

module.exports = getJsreportInstance;
