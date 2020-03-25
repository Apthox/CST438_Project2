const fs = require('fs');

module.exports.getAllProducts = function() {
    products = [];

    fs.readdirSync('./public/products').forEach(file => {
        if (!file.includes('.')) {
            // is folder
            console.log(file);
            var content = fs.readFileSync('./public/products/' + file + "/desc.json");
            var jsonContent = JSON.parse(content);
            jsonContent["id"] = file;
            console.log(jsonContent);
            products.push(jsonContent);
        }
    });

    console.log(products);
    return products;
};