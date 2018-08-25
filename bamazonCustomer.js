var inquirer = require('inquirer');
var mysql = require('mysql');

var amountOwed;
var currentDepartment;
var updateSales;

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id: ' + connection.threadId)
});

//Displays available items then calls the place order function
function showProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log('------------------------------------------------');
        console.log('-------------------Inventory--------------------');
        console.log('------------------------------------------------');

        for (i = 0; i < res.length; i++) {
            console.log('Item ID:' + res[i].id + ' Product Name: ' + res[i].ProductName + ' Price: ' + '$' + res[i].Price + '(Quantity left: ' + res[i].StockQuantity + ')')
        }
        console.log('------------------------------------------------');
        placeOrder();
    })
}

//Prompts user to order, fills the order, then calls the new order function
function placeOrder() {
    inquirer.prompt([{
        name: 'selectId',
        message: 'Please enter the ID of the product you wish to purchase',
        validate: function (value) {
            var valid = value.match(/^[0-9]+$/)
            if (valid) {
                return true
            }
            return 'Please enter a valid Product ID'
        }
    }, {
        name: 'selectQuantity',
        message: 'How many of this product would you like to order?',
        validate: function (value) {
            var valid = value.match(/^[0-9]+$/)
            if (valid) {
                return true
            }
            return 'Please enter a numerical value'
        }
    }]).then(function (answer) {
        connection.query('SELECT * FROM products WHERE id = ?', [answer.selectId], function (err, res) {
            if (answer.selectQuantity > res[0].StockQuantity) {
                console.log('Low Stock');
                console.log('This order was cancelled');
                console.log('');
                newOrder();
            }
            else {
                amountOwed = res[0].Price * answer.selectQuantity;
                currentDepartment = res[0].DepartmentName;
                console.log('Thank you for Ordering!');
                console.log('You total is $' + amountOwed);
                console.log('');
                //update products table
                connection.query('UPDATE products SET ? Where ?', [{
                    StockQuantity: res[0].StockQuantity - answer.selectQuantity
                }, {
                    id: answer.selectId
                }], function (err, res) { });
                //update departments table
                logSaleToDepartment();
                newOrder();
            }
        })

    }, function (err, res) { })
};

//new order or cancel
function newOrder() {
    inquirer.prompt([{
        type: 'confirm',
        name: 'choice',
        message: 'Continue shopping?'
    }]).then(function (answer) {
        if (answer.choice) {
            placeOrder();
        }
        else {
            console.log('Thank you for shopping at bamazon!');
            connection.end();
        }
    })
};


//pushs the sales to table
function logSaleToDepartment() {
    connection.query('SELECT * FROM departments WHERE DepartmentName = ?', [currentDepartment], function (err, res) {
        updateSales = res[0].TotalSales + amountOwed;
        updateDepartmentTable();
    })
};

function updateDepartmentTable() {
    connection.query('UPDATE departments SET ? WHERE ?', [{
        TotalSales: updateSales
    }, {
        DepartmentName: currentDepartment
    }], function (err, res) { });
};

showProducts();
