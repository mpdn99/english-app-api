var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 var mysql = require('mysql');
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({
     extended: true
 }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is runing')
});

app.get("/", (request, response) => {
    response.sendStatus(200);
});

 var dbConn = mysql.createConnection({
    host: "46.17.172.154",
    port:'3306',
    user: "u960615773_mobile",
    password: "Istech123",
    database: "u960615773_b2_app"
});

// app.get('/category', function (req, res) {
//     dbConn.query('SELECT * FROM category', function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'category list.' });
//     });
// });

app.get('/category/:id', function (req, res) {
    let category_id = req.params.id;
    if (!category_id) {
     return res.status(400).send({ error: true, message: 'Please provide test_id' });
    }
    dbConn.query('SELECT * FROM tests where category_id=?', category_id, function (error, results, fields) {
     if (error) throw error;
      return res.send({ error: false, data: results, message: 'category.' });
    });
});

app.get('/test', function (req, res) {
    dbConn.query('SELECT * FROM tests', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'tests list.' });
    });
});

app.get('/test/:id', function (req, res) {
    let test_id = req.params.id;
    if (!test_id) {
     return res.status(400).send({ error: true, message: 'Please provide test_id' });
    }
    dbConn.query('SELECT * FROM parts where part_id=?', test_id, function (error, results, fields) {
     if (error) throw error;
      return res.send({ error: false, data: results, message: 'test.' });
    });
});

app.get('/questions', function (req, res) {
    dbConn.query('SELECT * FROM questions', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'questions list.' });
    });
});

app.get('/test/questions/:id', function (req, res) {
    let question_id = req.params.id;
    if (!question_id) {
     return res.status(400).send({ error: true, message: 'Please provide question_id' });
    }
    dbConn.query('SELECT * FROM question where question_id=?', question_id, function (error, results, fields) {
     if (error) throw error;
      return res.send({ error: false, data: results, message: 'question.' });
    });
});

app.get('/test/question/:id/answer', function (req, res) {
    let question_id = req.params.id;
    if (!question_id) {
     return res.status(400).send({ error: true, message: 'Please provide question_id' });
    }
    dbConn.query('SELECT * FROM answers where question_id=?', question_id, function (error, results, fields) {
     if (error) throw error;
      return res.send({ error: false, data: results, message: 'answers list.' });
    });
});

 module.exports = app;