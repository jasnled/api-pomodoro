const express = require('express');
const boom = require('@hapi/boom');
const app = express();
const { config } = require('./config/config');
const cors = require('cors');
const routerApi = require('./routes');
const {
  logError,
  boomErrorHandler,
  errorHandler,
  ormErrorHandler,
} = require('./middleware/error.handler');
// cors
const whitelist = [
  'http://localhost:3000',
  'http://127.0.0.1:5050',
  'http://localhost:5050',
  'http://localhost:8080',
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(boom.unauthorized());
    }
  },
};
app.use(cors(options));
// errors handle
app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(ormErrorHandler);
//
app.get('/', (req, res)=>{
  res.send('welcome to my backend');
});
app.use(express.json());
// ejecutamos el enrutado
routerApi(app);
// ejecutamos el index de lo strategys de autenticacion
require('./utils/auth/index');
app.listen(config.port, () => {
  console.log(`listen to port: ${config.port}`);
});
