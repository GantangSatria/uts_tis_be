const express = require('express');
const soap = require('soap');
const fs = require('fs');
const path = require('path');
const routes = require('./app/routes/app.routes.js');

const expressServer = express()
const PORT = process.env.PORT || 3000;

const service = {
    HelloService: {
      HelloPort: {
        sayHello(args) {
          return {
            greeting: 'Hello, ' + args.name,
          };
        }
      }
    }
};

const wsdl = fs.readFileSync(path.join(__dirname, 'app', 'wsdl', 'service.wsdl'), 'utf8');

expressServer.use('/', routes);

expressServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    soap.listen(expressServer, '/hello', service, wsdl);
  });

