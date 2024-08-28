const express = require('express');
const path = require('path');
const bopa = require('body-parser');
const app = express();

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


// ---------------------------------------------- Siste server håndteringer ---------------------------------------------- //

// Start serveren med port 2000 (kan endres)
const port = 2000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}); 
