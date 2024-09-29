// declare our dependancies

const express = require('express');
const app = express();
const mysql = require ('mysql2');
const dotenv = require ('dotenv');
const cors = require('cors');

app.use(express.json());
app.use(cors());
dotenv.config();


// Connect to the database ***

const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

// Check if db connection works
db.connect((err) => {
    // No connection works
    if(err) return console.log("Errror connecting to the mysql db");

    // Yes connection works
    console.log("Connected to mysql successfully as id: ", db.threadId)

    // Question 1
    //GET METHOD example

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    app.get('/data', (req,res) => {
        //Retrieve data from database
        db.query('SELECT * FROM patients', (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                // Render the data in a template
                res.render('data', { results: results });
            }
        });
    });

    // Question 2

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    app.get('/data', (req,res) => {
        //Retrieve data from database
        db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                // Render the data in a template
                res.render('data', { results: results });
            }
        });
    });

    // Question 3

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    app.get('/data', (req,res) => {
        //Retrieve data from database
        db.query('SELECT first_name FROM patients', (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                // Render the data in a template
                res.render('data', { results: results });
            }
        });
    });

    // Question 4

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    app.get('/data', (req,res) => {
        //Retrieve data from database
        db.query('SELECT provider_specialty FROM providers', (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                // Render the data in a template
                res.render('data', { results: results });
            }
        });
    });


    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);

        // Send a message to the browser
        console.log('Sending message to the browser...');
        app.get('/', (req,res) => {
            res.send('Server started successfully! Proceed on!!')
        })
    });
});
 
