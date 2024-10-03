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
const port = 2000;

// Database config
let database;

// DB Models
const Ticket = require('./public/models/Ticket.js');

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Database connection failed:', err);
  process.exit(1);
});




// ---------------------------------------------- App content ---------------------------------------------- //

app.route('/')
  .get(async (req, res) => {
      res.render('dashboard');
  })

app.route('/tickets')
  .get(async (req, res) => {
    const tickets = await Ticket.find();
    res.render('tickets', { tickets });
  })


app.post('/create-ticket', async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const newTicket = new Ticket({
      title,
      description,
      status,
      date
    });

    await newTicket.save();

    res.redirect('/tickets');
  } catch (err) {
    res.status(500).json({ error: 'Could not add the ticket' });
  }
});
