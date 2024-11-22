const express = require('express');
const path = require('path');
const bopa = require('body-parser');
const app = express();

const connectDB = require('./database');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(bopa.json());
app.use(express.json());

// Config

// ---------------------------------------------- Database connection ---------------------------------------------- //

const port = 2000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Database connection failed:', err);
  process.exit(1);
});

// ---------------------------------------------- Functions & Configuration ---------------------------------------------- //

const Ticket = require('./models/Ticket');
let tickets = [];
let filter = SortTickets(tickets, "");

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


// ---------------------------------------------- App content ---------------------------------------------- //


// ------------------------------ //

/*             Routing            */

// ------------------------------ //


app.route('/')
  .get(async (req, res) => {
      res.render('dashboard');
  })

app.route('/tickets')
  .get(async (req, res) => {
    res.render('tickets', { filter });
  });

app.route('/login')
  .get(async (req, res) => {
    res.render('login');
  });



// ------------------------------ //

/*        Ticket handlers         */

// ------------------------------ //


// Post request to create ticket

app.post('/create-ticket', async (req, res) => {
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

app.get('/search', (req, res) => {
  const searchQuery = req.query.query;

  const filteredTickets = SortTickets(tickets, searchQuery);
  
  res.json({ results: filteredTickets });
});


// Get all tickets from the database

app.get('/tickets/all', async (req, res) => {
  try {

    const allTickets = await Ticket.find();

    res.json({ results: allTickets });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch tickets' });
  }
});


