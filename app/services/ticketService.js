const Ticket = require('../models/tickets');

const getTickets = async (args, callback) => {
  try {
    const ticketsFromDb = await Ticket.find();

    const tickets = {
      ticket: ticketsFromDb.map(t => ({
        id: t._id.toString(),
        name: t.name,
        train: t.train,
        date: t.date.toISOString().split('T')[0]
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

const updateTicket = async (args, callback) => {
  const { id, name, train, date } = args.ticket || {};

  if (!id || !name || !train || !date) {
    return callback({
      Fault: {
        faultcode: 'Client',
        faultstring: 'Missing id, name, train, or date field',
      },
    });
  }

  try {
    const updated = await Ticket.findByIdAndUpdate(id, {
      name,
      train,
      date: new Date(date),
    });

    if (!updated) {
      return callback(null, { result: 'Ticket not found' });
    }

    callback(null, { result: 'Ticket updated successfully' });
  } catch (error) {
    console.error('Error updating ticket:', error);
    callback(error);
  }
};

const deleteTicket = async (args, callback) => {
  const { id } = args.ticket;

  if (!id) {
    return callback({
      Fault: {
        faultcode: 'Client',
        faultstring: 'Missing ticket id',
      },
    });
  }

  try {
    const deleted = await Ticket.findByIdAndDelete(id);
    if (!deleted) {
      return callback(null, { result: 'Ticket not found' });
    }

    callback(null, { result: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    callback(error);
  }
};

module.exports = { getTickets, addTicket, updateTicket, deleteTicket };
