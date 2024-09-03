const express = require('express');
const path = require('path');
const bopa = require('body-parser');
const app = express();

const { connectToDb, getDb } = require('./database');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(bopa.json());

// DB Connection

const port = 2000;

let database;

connectToDb((err) => {
  if(!err) {

    // Start serveren

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

    db = getDb();
  }
})

const User = require('./models/userModel');


// ---------------------------------------------- App content ---------------------------------------------- //

app.route('/')
  .get(async (req, res) => {
      res.render('dashboard');
  })

app.route('/tickets')
  .get(async (req, res) => {
      res.render('tickets');
  })

app.get('/test', async (req, res) => {
  let list = []
  db.collection('users').find().forEach(element => list.push(element))
    .then(() => {
      res.status(200).json(list);
    }).catch((err) => {
      res.status(500).json({error: 'Could not fetch the documents.'})
    })
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


