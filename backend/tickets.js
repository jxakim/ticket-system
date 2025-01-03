const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
const Ticket = require('../models/Ticket');

require('dotenv').config();

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

function isAuthenticated(req, res, next) {
  if (!req.cookies.user) {
    const redirectTo = encodeURIComponent(req.originalUrl || '/');
    return res.redirect(`/login?redirect=${redirectTo}`);
  }
  next();
}


// Routes for tickets
router.get('/', async (req, res) => {
  let isLoggedIn = req.cookies.user;

  if (!isLoggedIn) {
    return res.redirect(`/login`);
  }

  const tickets = await Ticket.find();
  res.render('tickets', { filter: tickets, isLoggedIn: true });
});



// ------------------------------ //

/*        Ticket handlers         */

// ------------------------------ //

// Get request to open ticket editor
router.get('/open-ticket/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.render('ticket_editor', { ticket, isLoggedIn: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch ticket' });
  }
});



// Post request to create ticket

router.post('/create-ticket', isAuthenticated, async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const newTicket = new Ticket({
      title,
      description,
      status,
      date: new Date(),
    });

    await newTicket.save();
    res.redirect('/tickets');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not add the ticket' });
  }
});

  
// Search handler (server)
  
router.get('/search', isAuthenticated,  async (req, res) => {
  const searchQuery = req.query.query || '';

  try {
    const filteredTickets = await Ticket.find({
      title: { $regex: searchQuery, $options: 'i' },
    });

    res.json({ results: filteredTickets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch search results' });
  }
});
  
// Get all tickets from the database

router.get('/get-tickets', isAuthenticated, async (req, res) => {

    try {
      const allTickets = await Ticket.find();
  
      res.json({ results: allTickets });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Could not fetch tickets' });
    }
});
  
module.exports = router;

  