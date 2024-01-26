var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views/pages'))

app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

var pgp = require('pg-promise')();

const dbConfig = {
	host: '127.0.0.1',
	port: 5432,
	database: 'color_coded_db',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);

app.use(express.static(__dirname + '/'));

app.get('/views/pages/index.html', function(req, res) {
	console.log('home html');
	res.render('pages/index.ejs',{
		input: ''
	});
});

app.get('/', function(req, res) {
	console.log('home ejs');
	res.render('pages/index.ejs',{
		input: ''
	});
});

app.post('/load', function(req, res) {
	var id = req.body.User_ID;
	var query = "SELECT UserID, Colors FROM Colors WHERE UserId = '" + id + "';";
	console.log('loading');
	db.any(query)
		.then(function (info) {
			console.log(info);
			res.render('pages/index.ejs', {
				input: info
			})
	})
});

app.get('/test', function(req, res) {
	var insert = "INSERT INTO Colors(Colors) VALUES(ARRAY['#00ade2']);";
	var query = "SELECT Colors FROM Colors;";
	console.log('test');
	db.task('get-everything', task => {
		return task.batch([
			task.any(insert),
			task.any(query)
		]);
	}).then(info => {
			console.log(info[0]);
			console.log(info[1]);
			res.render('pages/index.ejs', {
				input: info[1]
			});
	});
});

app.post('/login', function(req, res) {
	var name = req.body.inputName;
	var pw = req.body.inputPassword3;
	var query = "SELECT UserID, Colors FROM Colors WHERE (username = '" + name + "' AND userpw = '" + pw + "');";
	console.log("login request");
	console.log("name is:");
	console.log(name);
	console.log("pw is:");
	console.log(pw);
	db.any(query)
		.then(function (info) {
			console.log("info is:");
			console.log(info);
			res.render('pages/index.ejs', {
				input: info
			});
	});
});


app.post('/register', function(req, res) {
	var name = req.body.inputName;
	var pw = req.body.inputPassword3;
	console.log("register request");
	console.log("name is:");
	console.log(name);
	console.log("pw is:");
	console.log(pw);
	var query = "INSERT INTO Colors(UserName, UserPw) VALUES('" + name + "', '" + pw + "');";
	db.any(query)
		.then(function (info) {
			res.render('pages/login.html', {
				input: info
			});
	});
});


app.post('/add_color', function(req, res) {
	var id = req.body.UserID;
	var color = req.body.hexval;
	console.log("adding color");
	console.log(color);
	console.log("to user");
	console.log(id);
	var insert = "UPDATE Colors SET Colors = Colors || '{" + color + "}' WHERE UserId = '" + id + "';";
	var query = "SELECT UserID, Colors FROM Colors WHERE UserId = '" + id + "';";
	db.task('get-everything', task => {
		return task.batch([
			task.any(insert),
			task.any(query)
		]);
	}).then(info => {
			console.log("returning");
			console.log(info[0]);
			console.log(info[1]);
			res.render('pages/index.ejs', {
				input: info[1]
			});
	});
});

app.listen(8000);
console.log('8000 is the magic port');