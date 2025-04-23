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
      UpdateTicket: TicketService.updateTicket,
      DeleteTicket: TicketService.deleteTicket
    }
  }
};

const wsdl = fs.readFileSync(path.join(__dirname, 'app', 'wsdl', 'service.wsdl'), 'utf8');


expressServer.use('/', routes);
expressServer.use('/wsdl', express.static(path.join(__dirname, 'app/wsdl')));

try {
  soap.listen(expressServer, '/wsdl', service, wsdl);
  console.log('SOAP service ready!');
} catch (err) {
  console.error('SOAP init error:', err);
}


expressServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

