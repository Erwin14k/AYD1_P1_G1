-- Creation of the database
CREATE DATABASE IF NOT EXISTS al_chilazo;

-- Show all the databases, to verify if exists.
SHOW DATABASES;

-- Use the database
USE al_chilazo;

-- Show the database tables
SHOW TABLES;

-- admin Table
CREATE TABLE IF NOT EXISTS admin(
  admin_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  admin_token VARCHAR(1000) NOT NULL DEFAULT '',
  admin_email VARCHAR(150) NOT NULL,
  admin_password VARCHAR(150) NOT NULL,
  admin_name VARCHAR(150) NOT NULL,
  admin_status VARCHAR(50) NOT NULL
);

-- user Table
CREATE TABLE IF NOT EXISTS user(
  user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_token VARCHAR(1000) NOT NULL DEFAULT '',
  user_email VARCHAR(150) NOT NULL,
  user_password VARCHAR(150) NOT NULL,
  user_name VARCHAR(150) NOT NULL,
  user_surname VARCHAR(150) NOT NULL,
  user_status VARCHAR(50) NOT NULL,
  admin_id BIGINT NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES admin(admin_id) ON DELETE CASCADE
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
  delivery_man_token VARCHAR(1000) NOT NULL DEFAULT '',
  delivery_man_name VARCHAR(150) NOT NULL,
  delivery_man_surname VARCHAR(150) NOT NULL,
  delivery_man_email VARCHAR(150) NOT NULL,
  delivery_man_password VARCHAR(150) NOT NULL,
  delivery_man_phone BIGINT NOT NULL,
  delivery_man_department VARCHAR(150) NOT NULL,
  delivery_man_municipality VARCHAR(150) NOT NULL,
  delivery_man_license_type VARCHAR(15) NOT NULL,
  delivery_man_transport VARCHAR(15) NOT NULL,
  delivery_man_status VARCHAR(50) NOT NULL,
  delivery_man_rating DECIMAL(10,2) NOT NULL,
  delivery_man_resume VARCHAR(500) NOT NULL,
  delivery_man_resume_key VARCHAR(500) NOT NULL,
  admin_id BIGINT NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES admin(admin_id) ON DELETE CASCADE
);

-- delivery_man_change_address Table
CREATE TABLE IF NOT EXISTS delivery_man_change_address(
  delivery_man_change_address_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  delivery_man_id BIGINT NOT NULL,
  new_department VARCHAR(150) NOT NULL,
  new_municipality VARCHAR(150) NOT NULL,
  change_description VARCHAR(500) NOT NULL,
  status VARCHAR(100) NOT NULL,
  admin_id BIGINT NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES admin(admin_id) ON DELETE CASCADE,
  FOREIGN KEY (delivery_man_id) REFERENCES delivery_man(delivery_man_id) ON DELETE CASCADE
);


-- coupon Table
CREATE TABLE IF NOT EXISTS coupon(
  coupon_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  coupon_code VARCHAR(150) NOT NULL,
  coupon_status VARCHAR(150) NOT NULL,
  user_id BIGINT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- company Table
CREATE TABLE IF NOT EXISTS company(
  company_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  company_token VARCHAR(1000) NOT NULL DEFAULT '',
  company_name VARCHAR(100) NOT NULL,
  company_description VARCHAR(500) NOT NULL,
  company_category VARCHAR(100) NOT NULL,
  company_email VARCHAR(100) NOT NULL,
  company_password VARCHAR(150) NOT NULL,
  company_department VARCHAR(150) NOT NULL,
  company_municipality VARCHAR(100) NOT NULL,
  company_address VARCHAR(200) NOT NULL,
  company_status VARCHAR(100) NOT NULL,
  admin_id BIGINT NOT NULL,
  company_file VARCHAR(500) NOT NULL,
  company_file_key VARCHAR(500) NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES admin(admin_id) ON DELETE CASCADE
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
  product_img_key VARCHAR(500) NOT NULL,
  product_number_of_sales INTEGER NOT NULL,
  product_stock INTEGER NOT NULL,
  FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE
);


-- combo Table
CREATE TABLE IF NOT EXISTS combo(
  combo_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  company_id BIGINT NOT NULL,
  combo_name VARCHAR(150) NOT NULL,
  combo_price DECIMAL(10,2) NOT NULL,
  combo_description VARCHAR(500) NOT NULL,
  combo_img VARCHAR(500) NOT NULL,
  combo_img_key VARCHAR(500) NOT NULL,
  combo_number_of_sales INTEGER NOT NULL,
  combo_stock INTEGER NOT NULL,
  FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE
);


-- order Table
CREATE TABLE IF NOT EXISTS _order(
  order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  coupon_id BIGINT DEFAULT NULL,
  delivery_man_id BIGINT DEFAULT NULL,
  user_id BIGINT NOT NULL,
  company_id BIGINT NOT NULL,
  order_status VARCHAR(150) NOT NULL,
  order_date TIMESTAMP NOT NULL,
  order_total DECIMAL(10,2),
  order_commission DECIMAL(10,2),
  order_department VARCHAR(150) NOT NULL,
  FOREIGN KEY (coupon_id) REFERENCES coupon(coupon_id) ON DELETE CASCADE,
  FOREIGN KEY (delivery_man_id) REFERENCES delivery_man(delivery_man_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE
);


-- delivery_man_rating Table
CREATE TABLE IF NOT EXISTS delivery_man_rating(
  delivery_man_rating_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  delivery_man_id BIGINT NOT NULL,
  rating INTEGER NOT NULL,
  order_id BIGINT NOT NULL,
  FOREIGN KEY (delivery_man_id) REFERENCES delivery_man(delivery_man_id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES _order(order_id) ON DELETE CASCADE
);

-- order_detail Table
CREATE TABLE IF NOT EXISTS order_detail(
  order_detail_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL,
  product_id BIGINT DEFAULT NULL,
  product_name VARCHAR(150) DEFAULT NULL,
  combo_id BIGINT DEFAULT NULL,
  combo_name VARCHAR(150) DEFAULT NULL,
  product_ammount INTEGER NOT NULL,
  FOREIGN KEY (order_id) REFERENCES _order(order_id) ON DELETE CASCADE,
  FOREIGN KEY (combo_id) REFERENCES combo(combo_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

-- Token generator function
DELIMITER //
CREATE FUNCTION api_token(PSECRET VARCHAR(255)) RETURNS VARCHAR(4000) READS SQL DATA
BEGIN
  DECLARE VRESULT VARCHAR(4000);
  SET VRESULT = HEX(MD5(PSECRET));
  RETURN VRESULT;
END //
DELIMITER ;

-- Admin user
INSERT INTO admin (admin_id,admin_email, admin_password, admin_name,admin_status)
VALUES (-1,'admin@root.com', 'root', 'root','Active');

-- Function to get the company_name by the company_id
DELIMITER //
CREATE FUNCTION getCompanyName(companyIdParam BIGINT) RETURNS VARCHAR(100)
BEGIN
  DECLARE companyName VARCHAR(100);
  SELECT company_name INTO companyName
  FROM company
  WHERE company_id = companyIdParam;
  RETURN companyName;
END //

-- Function to obtain the full name of a delivery man by the delivery_man_id
DELIMITER //
CREATE FUNCTION getDeliveryManName(deliveryManIdParam BIGINT) RETURNS VARCHAR(100)
BEGIN
  DECLARE deliveryManName VARCHAR(100);
  SELECT CONCAT(delivery_man_name, ' ', delivery_man_surname) INTO deliveryManName
  FROM delivery_man
  WHERE delivery_man_id = deliveryManIdParam;
  RETURN deliveryManName;
END //
DELIMITER ;

-- Function to obtain the department of a delivery man by the delivery_man_id
DELIMITER //
CREATE FUNCTION getDeliveryManDepartment(deliveryManIdParam BIGINT) RETURNS VARCHAR(100)
BEGIN
  DECLARE deliveryManDepartment VARCHAR(100);
  SELECT CONCAT(delivery_man_department,'') INTO deliveryManDepartment
  FROM delivery_man
  WHERE delivery_man_id = deliveryManIdParam;
  RETURN deliveryManDepartment;
END //
DELIMITER ;


-- Function to obtain the full name of a client by the user_id
DELIMITER //
CREATE FUNCTION getClientName(UserIdParam BIGINT) RETURNS VARCHAR(100)
BEGIN
  DECLARE clientName VARCHAR(100);
  SELECT CONCAT(user_name, ' ', user_surname) INTO clientName
  FROM user
  WHERE user_id = UserIdParam;
  RETURN clientName;
END //
DELIMITER ;

-- Function to generate a new coupon
DELIMITER //
CREATE FUNCTION generateCoupon()
RETURNS VARCHAR(36)
DETERMINISTIC
BEGIN
    DECLARE code VARCHAR(36);
    SET code = UUID();
    RETURN code;
END //
DELIMITER ;

-- Function to obtain the name of a product by the product_id
DELIMITER //
CREATE FUNCTION getProductName(productIdParam BIGINT) RETURNS VARCHAR(100)
BEGIN
  DECLARE productName VARCHAR(100);
  SELECT CONCAT(product_name, '') INTO productName
  FROM product
  WHERE product_id = productIdParam;
  RETURN productName;
END //
DELIMITER ;

-- Function to obtain the name of a combo by the combo_id
DELIMITER //
CREATE FUNCTION getComboName(comboIdParam BIGINT) RETURNS VARCHAR(100)
BEGIN
  DECLARE comboName VARCHAR(100);
  SELECT CONCAT(combo_name, '') INTO comboName
  FROM combo
  WHERE combo_id = comboIdParam;
  RETURN comboName;
END //
DELIMITER ;

-- Function to obtain the total comission accumulated by a delivery man
DELIMITER //
CREATE FUNCTION calculate_total_commission(deliveryManId BIGINT) RETURNS DECIMAL(10,2)
BEGIN
  DECLARE totalCommission DECIMAL(10,2) DEFAULT 0;
  SELECT IFNULL(SUM(order_commission), 0) INTO totalCommission
  FROM _order
  WHERE delivery_man_id = deliveryManId;
  RETURN totalCommission;
END//
DELIMITER ;