var mysql = require('mysql');

module.exports.connectToRemoteDatabase = function() {
    var con = mysql.createConnection({
        host: "kil9uzd3tgem3naa.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "pd0stonvt3jvcqr3",
        password: "cmvrezgw7g06r89j",
        port: 3306,
        database: "yh53y6e2dlt78gnx"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
}