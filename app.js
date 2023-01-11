const express = require('express');
const session = require('express-session');
const FileUpload = require('express-fileupload')
const { json } = require('sequelize');
const mysql = require('mysql');
const app = express();
const port = 3001;
const router = require('./routes/Userroute');
const dotenv = require('dotenv');
const passport = require('passport');
const db = require('./config/database');
const pembayaranmodel = require('./models/pembayaranmodel');

try {
    db.authenticate();
    console.log("succses")
    pembayaranmodel.sync();
} catch (error) {
    console.log(error);
}

dotenv.config()

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'perumahan'
});

app.use('/static', express.static("public"));
app.use(express.json());
app.use(FileUpload());
app.use(express.urlencoded({ extended : true }))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly : true
    }
}));

app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/berita');
			} else {
				response.redirect('/alogin')
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.set('view engine', 'ejs')
app.use(passport.initialize())
app.use(passport.session())
require('./config/Passport')

app.use((req, res, next) => {
    res.locals.user = req.user
    next()
});

app.use(router)

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});