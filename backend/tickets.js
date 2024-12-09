const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

let tickets = [];
let filter = [];

function SortTickets(array, str) {
  let sortedList = [];
  array.forEach(ticket => {
    if (ticket.title.toLowerCase().includes(str.toLowerCase())) {
      console.log(ticket.title);
      sortedList.push(ticket);
    }
  });
  return sortedList;
}

async function resetTicketFilter() {
  tickets = await Ticket.find();
  filter = SortTickets(tickets, "");
}

resetTicketFilter();

// Routes for tickets
router.get('/', async (req, res) => {
  res.render('tickets', { filter });
});


// ------------------------------ //

/*        Ticket handlers         */

// ------------------------------ //


// Post request to create ticket

router.post('/create-ticket', async (req, res) => {
    const { title, description, status } = req.body;
    const date = new Date();
  
    try {
      const newTicket = new Ticket({
        title,
        description,
        status,
        date
      });
  
      await newTicket.save();
  
      tickets.push(newTicket); 
      filter = SortTickets(tickets, "");
  
      res.redirect('/tickets');
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Could not add the ticket' });
    }
  });
  
  
// Search handler (server)
  
router.get('/search', (req, res) => {
    const searchQuery = req.query.query;

    const filteredTickets = SortTickets(tickets, searchQuery);

    res.json({ results: filteredTickets });
});
  
  
// Get all tickets from the database

router.get('/get-tickets', async (req, res) => {
    try {
  
      const allTickets = await Ticket.find();
  
      res.json({ results: allTickets });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Could not fetch tickets' });
    }
});
  
module.exports = router;

  