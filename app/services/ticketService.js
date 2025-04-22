const Ticket = require('../models/tickets');

const getTickets = async (args, callback) => {
  try {
    const ticketsFromDb = await Ticket.find();

    const tickets = {
      ticket: ticketsFromDb.map(t => ({
        name: t.name,
        train: t.train,
        date: t.date.toISOString().split('T')[0] // format jadi YYYY-MM-DD
      }))
    };
    
    console.log('Fetched tickets:', tickets);
    callback(null, { tickets });
  } catch (error) {
    console.error('Error fetching tickets:', error); 
    callback(error);
  }
};

const addTicket = async (args, callback) => {
  console.log('Received args:', args);

  const { name, train, date } = args.ticket || {}; 

  if (!name || !train || !date) {
    return callback({
      Fault: {
        faultcode: 'Client',
        faultstring: 'Missing name, train, or date field'
      }
    });
  }

  try {
    const newTicket = new Ticket({
      name,
      train,
      date: new Date(date),
    });

    await newTicket.save();

    callback(null, { result: 'Ticket added successfully' });
  } catch (error) {
    console.error('Error adding ticket:', error);
    callback(error);
  }
};

module.exports = { getTickets, addTicket };
