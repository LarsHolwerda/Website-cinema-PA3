var express = require('express');
var app = express();
const path = require('path');
const db = require('./database');
const { time } = require('console');
const bodyParser = require('body-parser');
// Import bcrypt library for password hashing
const bcrypt = require("bcrypt");
// Create a new session store using memory
const session = require("express-session");
// Create a new session store using memory
const store = new session.MemoryStore();

// Configure session
app.use(
  session({
    secret: "webtech",
    cookie: { maxAge: 3600000 }, // store the cookies in memory (1 hour)
    saveUninitialized: false,
    resave: true,
    store,
  })
);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
  })

function checkLogin(req, res, next) {
    if (req.session && req.session.user) {
        // Gebruiker is ingelogd
        console.log("Logged in!");
        next();
    } else {
        // Gebruiker is niet ingelogd, stuur ze naar de loginpagina
        console.log("please, log in");
        res.redirect('/login');
    }
}


  app.get('/receiveMovies/:begingetal(\\d+)/:eindgetal(\\d+)', function (req, res) {
    var begingetal = req.params.begingetal
    var eindgetal = req.params.eindgetal
    let sql = 'SELECT * FROM MOVIES';
    db.all(sql, function(err, data) { 
        res.json(data.slice(begingetal,eindgetal));
        
    })  
  })



app.get('/receiveProfile/', function (req, res) {
  const email = req.session.user;
  let sql = `SELECT * FROM profiles WHERE email = ?`;
  db.all(sql, email, function(err, data) { 
      res.json(data);
      
  })  
})



//profile info getten op basis van email en query de hele zooi en stuur het: 
app.get('/profiledata', function(req, res){
  const email = req.session.user;
  let sql = `SELECT * FROM profiles WHERE email = ?`;
  db.get(sql, email, function(err, row) {
    if (err) {
      res.json({ error: "Unable to retrieve profile information" });
    } else if (!row) {
      res.json({ error: "No profile information found" });
    } else {
      const profile = {
        firstname: row.first_name,
        lastname: row.last_name,
        email: row.email,
        adress: row.adress,
        creditcard: row.creditcard
      };
      res.json(JSON.stringify(profile));
      console.log("Data send:", profile);

    }
  });
});

app.get('/profile', checkLogin, function(req,res){
  res.sendFile(path.join(__dirname+'/profile.html'));
})

  app.get('/movie/:id(\\d+)', function(req, res) {
    res.sendFile(path.join(__dirname+'/moviepage.html'));
  })

  app.get('/movie.js', function(req, res) {
    res.set('Content-Type','application/javascript')
    res.sendFile(path.join(__dirname+'/movie.js'));
  });

  app.get('/orderladen.js', function(req, res) {
    res.set('Content-Type','application/javascript')
    res.sendFile(path.join(__dirname+'/orderladen.js'));
  });

  app.get('/registration.js', function(req, res) {
    res.set('Content-Type','application/javascript')
    res.sendFile(path.join(__dirname+'/registration.js'));
  });

  app.get('/receiveOrder/', function(req, res) {
    const email = req.session.user;
    let sql = 'SELECT currentOrder FROM profiles WHERE email = ?';
    db.all(sql, email, function(err, data) { 
        res.json(data);
    })  
  })

  app.get('/receiveMovie/:id(\\d+)', function(req, res) {
    var id = req.params.id;
    let sql = 'SELECT * FROM MOVIES';
    db.all(sql, function(err, data) { 
        res.json(data[(id-1)]);
    })  
  })

  app.get('/getCurrentUser', function(req, res) {
    res.json({user: req.session.user});
  }); 

  //NIEUWE ORDER UPDATER
  app.post('/postOrder/:movie/:timeslot', checkLogin, function(req, res) {
    var movieTitle = req.params.movie;
    var timeslot = req.params.timeslot;
    var currentorder = movieTitle + " " + timeslot
  
    // Get the email of the current user from the session
    var email = req.session.user;
  
    // Update the query to use the email of the current user
    let sql = 'UPDATE profiles SET currentOrder = currentOrder || ", "||? WHERE email = ?'
    
    db.run(sql, [currentorder, email], function(err) {
      if (err) {
        console.error(err);
        return res.status(500).send("An error occurred while adding the ticket to your order.");
      }
  
      console.log("This is added to your order: " + currentorder);
      res.send('The ticket for ' + currentorder + ' is added to your order! Press the "Show your order!" button to see your order!');
    });
  });


app.get('/order', function(req,res){
  res.sendFile(path.join(__dirname+'/order.html'));

})


let loggedIn = false
// Handle the submitted login form
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password; // The unhashed password entered by the user

  if (email && password) {
    if (req.session.authenticated) {
      res.json(req.session);
    } else {
    }
  }
  // Find the user based on their email
  let sql = 'SELECT * FROM profiles WHERE email = ?'
  await db.get(sql, email, function(err, row) {
    console.log(row.hash, password, email)
    if (row && row.hash != null) {
      console.log(row.hash, password, email)
      const passwordMatches = bcrypt.compare(password, row.hash);
      if (passwordMatches) {
        // Store the user's email in the session and redirect to the dashboard
        req.session.authenticated = true;
        req.session.user = email;
        loggedIn = true
        console.log("Session ID:", req.sessionID);
        res.redirect("/");
        console.log(loggedIn);
        console.log(req.session.user);
      } else {
        res.send("Incorrect password");
      }
    } else {
      res.send("No user found with that email");
    }
  });

});

app.post('/register', async (req, res) => { // Definieer een route voor het registratieformulier
  
    const firstname = req.body.firstname; 
    const lastname = req.body.lastname; // Haal de naam op uit de request body
    const email = req.body.email; // Haal de email op uit de request body
    const password = req.body.password; // Haal het wachtwoord op uit de request body
    const adress = req.body.adress;
    const creditcard = req.body.creditcard; 



    // Hash password and creditcard credentials with bcrypt
    const passwordHash = await bcrypt.hash(password, 10);
    const creditHash = await bcrypt.hash(creditcard, 10);

  
    const query = `INSERT INTO profiles (first_name, last_name, email, hash, adress, creditcard, currentOrder, orderHistory) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`; // SQL query om de data in de 'profiles' tabel in te voegen!
  
    db.run(query, firstname, lastname, email, passwordHash, adress, creditHash, "", "", (err) => { // Voer de query uit met de gebruikersgegevens als parameters
  
      if (err) { 
        console.error(err.message); // Log de foutmelding 
        res.send('Registratie mislukt. Probeer het opnieuw.'); 
      } else {
        res.redirect("/login"); 
      }
    });
  });


app.get('/login', function(req,res){
  res.sendFile(path.join(__dirname+'/login.html'));
})

app.get('/register', function(req,res){
  res.sendFile(path.join(__dirname+'/register.html'));
})


app.get('/profileladen.js', function(req, res) {
  res.set('Content-Type','application/javascript')
  res.sendFile(path.join(__dirname+'/profileladen.js'));
});

  app.get('/receiveTimeslots/:selectedMovieTimeslot(\\d+)', function (req, res) {
    var timeslot = req.params.selectedMovieTimeslot;    
    let sql = 'SELECT * FROM TIMESLOTS WHERE timeslotid = ?';
    db.all(sql, timeslot, function(err, data) { 
        res.json(data);
        
    })  
  })

  app.get('/receiveProfile/:id', function (req, res) {
    var userid = req.params.id;   
    req.session.userid = userid; // Gebruik sessie variabele om de userid op te slaan 
    let sql = 'SELECT * FROM profiles WHERE user_ID = ?';
    db.all(sql, userid, function(err, data) { 
        res.json(data);
        console.log(data);
    })  
  })


  app.get('/logout', function (req, res) {
    req.session.destroy()
    res.redirect('/')
  })
  

  app.get('/checkIfLoggedIn/', function (req, res) {
    if(req.session.user){
      res.json(true)
    }
    else{
      res.json(false)
    }
  })

  app.post('/removeTicketFromOrder/:newOrder?', function (req, res) {
    const email = req.session.user;
    var newOrder = req.params.newOrder || ""; 
    var userid = req.params.id
    console.log(newOrder, userid)   
    let sql = 'UPDATE profiles SET currentOrder = ? WHERE email = ?';
    db.run(sql, newOrder,email, function(err, data) { 
        res.json('ticket verwijderd');
        
    })  
  })



app.post('/payOrder/', function(req, res) {
    const email = req.session.user;
    let sql_trackOrderHistory = 'UPDATE profiles SET orderHistory = orderHistory || currentOrder WHERE email = ?'
    emptyCurrentOrder = ""
    let sql_clearCurrentOrder = 'UPDATE profiles SET currentOrder = ? WHERE email = ?'
      db.run(sql_trackOrderHistory, email, function(err) {
  
      console.log("order tracked");
    });
    db.run(sql_clearCurrentOrder, emptyCurrentOrder, email, function(err) {
  
      console.log("current order empty now");
    });
    res.send('Your order has been confirmed and added to your order history!');

  });
  

app.use(function(request, response) {
    response.status(404).send("Page not found!");
    });


app.listen(8081);



console.log('Server running at http://127.0.0.1:8081/');