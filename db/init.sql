-- Creation of the database
CREATE DATABASE IF NOT EXISTS al_chilazo;

-- Show all the databases, to verify if exists.
SHOW DATABASES;

-- Use the database
USE al_chilazo;

-- Show the database tables
SHOW TABLES;

-- Instrctions to avoid truncate or drop conflicts
SET FOREIGN_KEY_CHECKS = 0;
SET FOREIGN_KEY_CHECKS = 1;


-- user Table
CREATE TABLE IF NOT EXISTS user(
  user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_email VARCHAR(150) NOT NULL,
  user_password VARCHAR(150) NOT NULL,
  user_name VARCHAR(150) NOT NULL,
  user_surname VARCHAR(150) NOT NULL
);

-- user_payment_method Table
CREATE TABLE IF NOT EXISTS user_payment_method(
  user_payment_method_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  card_type VARCHAR(50) NOT NULL,
  card_number BIGINT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- user_address Table
CREATE TABLE IF NOT EXISTS user_address(
  user_address_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  department VARCHAR(150) NOT NULL,
  municipality VARCHAR(150) NOT NULL,
  address VARCHAR(250) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- delivery_man Table
CREATE TABLE IF NOT EXISTS delivery_man(
  delivery_man_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  delivery_man_name VARCHAR(150) NOT NULL,
  delivery_man_surname VARCHAR(150) NOT NULL,
  delivery_man_email VARCHAR(150) NOT NULL,
  delivery_man_phone BIGINT NOT NULL,
  delivery_man_department VARCHAR(150) NOT NULL,
  delivery_man_municipality VARCHAR(150) NOT NULL,
  delivery_man_license_type VARCHAR(15) NOT NULL,
  delivery_man_transport VARCHAR(15) NOT NULL,
  delivery_man_status VARCHAR(50) NOT NULL,
  delivery_man_rating DECIMAL(10,2) NOT NULL,
  delivery_man_resume VARCHAR(500) NOT NULL
);

-- delivery_man_change_address Table
CREATE TABLE IF NOT EXISTS delivery_man_change_address(
  delivery_man_change_address_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  delivery_man_id BIGINT NOT NULL,
  new_department VARCHAR(150) NOT NULL,
  new_municipality VARCHAR(150) NOT NULL,
  change_description VARCHAR(500) NOT NULL,
  status VARCHAR(100) NOT NULL,
  FOREIGN KEY (delivery_man_id) REFERENCES delivery_man(delivery_man_id) ON DELETE CASCADE
);


-- coupon Table
CREATE TABLE IF NOT EXISTS coupon(
  coupon_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  coupon_code VARCHAR(150) NOT NULL,
  coupon_status VARCHAR(150) NOT NULL
);

-- company Table
CREATE TABLE IF NOT EXISTS company(
  company_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  company_name VARCHAR(100) NOT NULL,
  company_description VARCHAR(500) NOT NULL,
  company_category VARCHAR(100) NOT NULL,
  company_email VARCHAR(100) NOT NULL,
  company_department VARCHAR(150) NOT NULL,
  company_municipality VARCHAR(100) NOT NULL,
  company_address VARCHAR(200) NOT NULL,
  status VARCHAR(100) NOT NULL
);

-- company_document Table
CREATE TABLE IF NOT EXISTS company_document(
  company_document_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  company_id BIGINT NOT NULL,
  company_document_name VARCHAR(150) NOT NULL,
  company_document_description VARCHAR(150) NOT NULL,
  company_document_file VARCHAR(500) NOT NULL,
  FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE
);

-- product Table
CREATE TABLE IF NOT EXISTS product(
  product_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  company_id BIGINT NOT NULL,
  product_type VARCHAR(180) NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  product_description VARCHAR(500) NOT NULL,
  product_img VARCHAR(500) NOT NULL,
  FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE
);

-- order Table
CREATE TABLE IF NOT EXISTS order(
  order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  coupon_id BIGINT NOT NULL,
  delivery_man_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  user_address_id BIGINT NOT NULL,
  order_status VARCHAR(150) NOT NULL,
  order_date TIMESTAMP NOT NULL,
  order_total DECIMAL(10,2),
  FOREIGN KEY (coupon_id) REFERENCES coupon(coupon_id) ON DELETE CASCADE,
  FOREIGN KEY (delivery_man_id) REFERENCES delivery_man(delivery_man_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (user_address_id) REFERENCES user_address(user_address_id) ON DELETE CASCADE
);


-- delivery_man_rating Table
CREATE TABLE IF NOT EXISTS delivery_man_rating(
  delivery_man_rating_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  delivery_man_id BIGINT NOT NULL,
  rating INTEGER NOT NULL,
  order_id BIGINT NOT NULL,
  FOREIGN KEY (delivery_man_id) REFERENCES delivery_man(delivery_man_id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES order(order_id) ON DELETE CASCADE
);
-- order_detail Table
CREATE TABLE IF NOT EXISTS order_detail(
  order_detail_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  product_ammount INTEGER NOT NULL,
  FOREIGN KEY (order_id) REFERENCES order(order_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);