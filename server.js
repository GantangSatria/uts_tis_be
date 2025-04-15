const express = require('express');
const soap = require('soap');

const routes = require('./app/routes/app.routes.js');

const expressServer = express()
const PORT = process.env.PORT || 3000;

expressServer.use('/', routes);

expressServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    // soap.listen(expressServer, '/hello', service, wsdl);
  });

