const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if (err) {
    console.log('Unable to log!');
  }
  })
  next();
});

// app.use((req, res, nxet) => {
//   res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!<h1>')
  // res.send({
  //   name: 'Andrew',
  //   like: [
  //     'sas',
  //     'dfdf',
  //   ]
  // })
  res.render('HomePage.hbs', {
    pageTitle:'Main Page',
    date: new Date().getFullYear(),
  })
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle:'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
