-- Create DB and select it 
CREATE DATABASE bamazon;
USE bamazon;

-- create table to store inventory data

CREATE TABLE products (
    item_id INTEGER (5) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

-- Insert mock data into the table

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Bananas', 'Fruits', 1.50, 100),
		('Apples', 'Fruits', 2.25, 507),
		('Oranges', 'Fruits', 1.50, 300),
		('Mangos', 'Fruits', 6.25, 627),
		('Makeup', 'Cosmetics', 15.55, 200),
		('Shampoo', 'Cosmetics', 7.50, 200),
		('Soap', 'self_care', 3.50, 200),
		('Toothpaste', 'self_care', 2.50, 200),
		('Deororant', 'self_care', 4.50, 200),
		('Moisturizer', 'self_care', 3.50, 200),
		('Basketball', 'Sports', 20.50, 423),
		('Resistance Band', 'Sports', 12.75, 150),
		('Trendmill', 'Sports', 499.99, 40),
		('Sweatpants', 'Clothing', 15.00, 120),
		('White T-Shirt', 'Clothing', 9.99, 250),
		('Tank Top', 'Clothing', 7.25, 157),
		('Lettuce', 'Produce', 1.50, 163),
		('Tomato', 'Produce', 0.50, 103),
		('Spinach', 'Produce', 2.70, 100),
		('Kale', 'Produce', 1.50, 100);