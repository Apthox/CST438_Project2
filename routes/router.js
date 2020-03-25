var express = require('express');
var mysql = require('mysql');
var session = require('express-session');
var router = express.Router();

router.get('/cart', function(req, res, next) {
    res.render('cart', { title: 'Cart' });
});

/* GET home page. */
router.get('/', function(req, res, next) {
    let login = "Login";
    let logLink = "/login";
    let user = "Stranger";
    if (req.session && req.session.username && req.session.username.length) {
        login = "Logout",
            logLink = "/logout",
            user = req.session.username;

    }
    res.render('index', {
        login: login,
        logLink: logLink,
        user: user
    });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

router.post('/login', async function(req, res, next) {

    let successful = false;
    let rows = await loginUser(req.body);

    if (rows.length > 0) {
        if (rows[0].password == req.body.password &&
            rows[0].username == req.body.username) {
            successful = true;
            req.session.username = rows[0].username;
        }
    }

    res.json({
        successful: successful
    });
});

router.get('/logout', async function(req, res, next) {

    if (req.session && req.session.username && req.session.username.length) {
        delete req.session.username;
        res.redirect("/");
    }

});


router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Register' });
});

router.post('/register', async function(req, res, next) {
    let message = "User WAS NOT added to the database!";
    let successful = false;
    console.log(req.body);
    if (req.body.username == '' ||
        req.body.password == '' ||
        req.body.age == '') {
        message = "Some fields are empty";
    } else if (isNaN(req.body.age) || parseInt(req.body.age) < 21 || parseInt(req.body.age) > 99) {
        message = "Invalid age";
    }


    // Call sql checks
    else {
        let checkUsername = await registrationCheckUsername(req.body);

        if (checkUsername[0].cnt > 0) {
            message = "Username already exists";
        } else {
            console.log("req.body: ", req.body);
            let rows = await registerUser(req.body);
            if (rows.affectedRows > 0) {
                let rows = await loginUser(req.body);
                if (rows.length > 0) {
                    if (rows[0].password == req.body.password &&
                        rows[0].username == req.body.username) {
                        req.session.username = rows[0].username;
                        req.session.email = rows[0].email;
                    }
                }
            }
        }

    }

    res.json({
        successful: successful,
        message: message
    });

});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

function registerUser(body) {
    let conn = dbConnection();

    return new Promise(function(resolve, reject) {
        conn.connect(function(err) {
            if (err) throw err;
            let sql = `INSERT INTO user
                      (username, password, 
                      age)
                      VALUES(?, ?, ?)
                        `;
            let params = [body.username, body.password, body.age];

            conn.query(sql, params, function(err, rows, fields) {
                if (err)
                    throw err;
                conn.end();
                resolve(rows);
            });
        });
    });
}

function loginUser(body) {

    let conn = dbConnection();

    return new Promise(function(resolve, reject) {
        conn.connect(function(err) {
            if (err) throw err;
            let sql = `SELECT * 
                    FROM user
                    WHERE username = ? 
                         `;
            let params = [body.username];

            conn.query(sql, params, function(err, rows, fields) {
                if (err)
                    throw err;
                conn.end();
                resolve(rows);
            });

        });
    });
}

// checks if username is valid
function registrationCheckUsername(body) {

    let conn = dbConnection();

    return new Promise(function(resolve, reject) {
        conn.connect(function(err) {
            if (err) throw err;
            console.log("RegistrationCheckUsername Connected!");

            let sql = `SELECT COUNT(username) AS cnt
                      FROM user
                      WHERE username = ? 
                      `;

            conn.query(sql, [body.username], function(err, rows, fields) {
                if (err) throw err;
                conn.end();
                resolve(rows);
            });

        });
    });
}

function dbConnection() {

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