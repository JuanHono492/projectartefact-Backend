const jsreport = require('jsreport')({
    configFile: './jsreport.config.json',
    extensions: {
      'logger': {
        console: {
          level: 'debug' // Habilita logs más detallados
        }
      }
    }
  });
  
  jsreport.init().then(() => {
    console.log('jsreport inicializado correctamente');
  }).catch((e) => {
    console.error('Error al inicializar jsreport:', e);
  });
  