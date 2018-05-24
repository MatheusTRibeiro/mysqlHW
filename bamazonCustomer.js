// Require packages needed
var inquirer = require('inquirer');
var mysql = require('mysql');

// Define the MySQL connection parameters
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "root",
    database: "bamazon"
});


// use inquirer's prompt which item and the quantity the user would like to purchase 
function promptUser() {

    // Prompt the user to select an item
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: "What is the ID of the item you'd like to purchase?",
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to purchase?',
            filter: Number
        }
    ]).then(function (input) {

        var item = input.item_id;
        var quantity = input.quantity;

        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, { item_id: item }, function (err, data) {
            if (err) throw err;

            if (input.item_id != input.item_id) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                displayStock();

            } else {
                var productData = data[0];

                // If the quantity requested by the user is in stock
                if (quantity <= productData.stock_quantity) {
                    console.log('Congratulations, the product you requested is in stock! Placing order!');

                    // Construct the updating query string
                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    // update and console log the updated stock numbers.

                    var updatedStock = productData.stock_quantity - quantity;


                    console.log("There are " + updatedStock + " units left of this item.");


                    connection.query(updateQueryStr, function (err, data) {
                        if (err) throw err;

                        console.log('Your total is $' + productData.price * quantity);

                        // End the database connection
                        connection.end();
                    })
                } else if (quantity >= productData.stock_quantity) {
                    console.log("Insufficient quantity! Please try again...\n");
                    return runApp();
                 }
            }
        })
    })
}


function displayStock() {

    // Construct the db query string
    queryStr = 'SELECT * FROM products';

    // Connect to the db and display avaiable data
    connection.query(queryStr, function (err, data) {
        if (err) throw err;

        console.log("Available Inventory: \n");

        var stockItem = "";
        for (var i = 0; i < data.length; i++) {
            stockItem = "";
            stockItem += 'Item ID: ' + data[i].item_id + '  |  ';
            stockItem += 'Product Name: ' + data[i].product_name + '  |  ';
            stockItem += 'Department: ' + data[i].department_name + '  | ';
            stockItem += 'Price: $' + data[i].price + '\n';

            console.log(stockItem);
        }

        console.log("------------------------------------------------------------------------\n");

        // Prompt the user for item/quantity they would like to purchase
        promptUser();
    })
}

// initiate the app and display the available stock

function runApp() {

    displayStock();
}

// Run the application logic
runApp();