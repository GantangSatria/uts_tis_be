const db = require('./db');
const Ticket = require('./models/tickets');

const dummyTickets = [
  { name: 'Satria', train: 'Argo Wilis', date: new Date('2025-04-20') },
  { name: 'Budi', train: 'Matarmaja', date: new Date('2025-04-21') },
  { name: 'Ani', train: 'Taksaka', date: new Date('2025-04-22') }
];

Ticket.insertMany(dummyTickets)
  .then(() => {
    console.log('✅ Dummy tickets inserted');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Error inserting dummy tickets:', err);
    process.exit();
  });
