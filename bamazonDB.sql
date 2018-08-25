CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
	ProductName VARCHAR(100) NOT NULL,
	DepartmentName VARCHAR(100) NOT NULL,
	Price DECIMAL(10,2) default 0,
	StockQuantity INT default 0,
	PRIMARY KEY(id)
);

INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Guild Wars 2', 'Game', 49.99, 12);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('World of Warcraft', 'Game', 69.99, 20);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Super Smash Bros Ultimate', 'Game', 59.99, 10);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Mario Party', 'Game', 59.99, 33);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Legend of Zelda', 'Game', 69.99, 10);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Nintendo Switch', 'Electronics', 299.99, 12);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Playstation 4', 'Electronics', 299.99, 40);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Xbox One X', 'Electronics', 499.99, 3);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Nintendo Joy Con Controllers', 'Accessories', 70.99, 4);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Playstation 4 Controller', 'Accessories', 75.99, 20);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Xbox One Controller', 'Accessories', 75.99, 2);

CREATE TABLE departments (
	DepartmentId INT NOT NULL AUTO_INCREMENT,
	DepartmentName VARCHAR(100) NOT NULL,
	OverheadCost DECIMAL(10,2) NOT NULL,
	TotalSales DECIMAL(10,2),
	PRIMARY KEY(DepartmentId)
);

INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Game', 500);
INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Electronics', 500);
INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Accessories', 500);