const Ticket = require('../models/tickets');

const getTickets = async (args, callback) => {
  try {
    const tickets = await Ticket.find();
    callback(null, { tickets });
  } catch (error) {
    callback(error);
  }
};

const addTicket = async (args, callback) => {
  const { name, train, date } = args.ticket; 

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
