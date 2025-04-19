const express = require('express');
const soap = require('soap');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./app/routes/app.routes.js');
const TicketService = require('./app/services/ticketService.js');

const expressServer = express()
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/kereta_db';

mongoose.connect(MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const service = {
  TicketService: {
    TicketPortType: {
      GetTickets: TicketService.getTickets,
      AddTicket: TicketService.addTicket,
    }
  }
};

const wsdlXML = fs.readFileSync('./app/wsdl/service.wsdl', 'utf8');
// const wsdl = fs.readFileSync(path.join(__dirname, 'app', 'wsdl', 'service.wsdl'), 'utf8');

expressServer.use('/', routes);

soap.listen(expressServer, '/wsdl', service, wsdlXML);
console.log("SOAP endpoint at http://localhost:3000/wsdl");

expressServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

