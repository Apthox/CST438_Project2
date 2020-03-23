var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homepage' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/login', async function(req, res, next) {
    
    let successful = false;
    console.log(req.body);
    let rows = await loginUser(req.body);
    
    res.json({
        successful: successful
    });
});


router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/register', async function(req, res, next) {
    let rows = await registerUser(req.body);

});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function registerUser(body){
    let conn = dbConnection();

    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
          if (err) throw err;
          let sql = `INSERT INTO user
                      (username, password, 
                      age)
                      VALUES(?, ?, ?)
                        `;
          let params = [body.username, body.password, body.age]; 
           
          conn.query(sql, params, function (err, rows, fields) {
              if (err) 
                throw err;
              conn.end();
              resolve(rows);
          });
        });
    });
}

function loginUser(body){
   
   let conn = dbConnection();
   
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           let sql = `SELECT * 
                    FROM user
                    WHERE username = ? 
                         `;
           let params = [body.username];
           
           conn.query(sql, params, function (err, rows, fields) {
              if (err) 
                throw err;
              conn.end();
              resolve(rows);
           });

        });
    });
}

function dbConnection(){

   let conn = mysql.createConnection({
            host: "kil9uzd3tgem3naa.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
            user: "pd0stonvt3jvcqr3",
            password: "cmvrezgw7g06r89j",
            port: 3306,
            database: "yh53y6e2dlt78gnx"
       }); //createConnection

    return conn;
}

module.exports = router;
