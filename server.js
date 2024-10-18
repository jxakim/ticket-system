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

// DB Connection

const port = 2000;

// Database config

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Database connection failed:', err);
  process.exit(1);
});

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
  tickets = await Ticket.find(); // Load all tickets from the database
  filter = SortTickets(tickets, ""); // Initially show all tickets
}

resetTicketFilter();


// ---------------------------------------------- App content ---------------------------------------------- //

app.route('/')
  .get(async (req, res) => {
      res.render('dashboard');
  })

app.route('/tickets')
  .get(async (req, res) => {
    res.render('tickets', { filter });
  });

// Create ticket request 

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



app.get('/search', (req, res) => {
  const searchQuery = req.query.query;

  // Filter the tickets based on the search query
  const filteredTickets = SortTickets(tickets, searchQuery);

  // Return the filtered tickets as JSON
  res.json({ results: filteredTickets });
});


app.get('/tickets/all', async (req, res) => {
  try {

    // Fetch all tickets from the database
    const allTickets = await Ticket.find();

    res.json({ results: allTickets });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch tickets' });
  }
});
