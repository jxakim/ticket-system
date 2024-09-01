const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bopa = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost:27017/Ticket-System');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(bopa.json());

app.route('/')
  .get(async (req, res) => {
      res.render('dashboard');
  })

app.route('/tickets')
  .get(async (req, res) => {
      res.render('tickets');
  })

// Create ticket request
/*

app.post('/create-ticket', async (req, res) => {
  const { TicketId, TicketName } = req.body;

  const sql = "INSERT INTO bookinger (Brukernavn, PlassID, Dato, Aktiv) values (?, ?, ?, ?)";
  const result = await queryDb(sql, [ Brukernavn, PlassID, dato, true ]);
  
  res.json({ result });
});

*/


// ---------------------------------------------- Siste server håndteringer ---------------------------------------------- //

// Start serveren med port 2000 (kan endres)
const port = 2000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}); 
