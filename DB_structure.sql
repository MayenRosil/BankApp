

CREATE DATABASE IF NOT EXISTS BankApp;
USE BankApp;

CREATE TABLE user (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(25),
    last_name VARCHAR(25),
    email VARCHAR(75),
    username VARCHAR(25),
    password VARCHAR(100),
    dpi VARCHAR(13)
);

CREATE TABLE card_company (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(4) -- VISA, MC, AMEX
);

-- SE UNIFICAN TARJETAS Y CUENTAS EN UNA SOLA TABLA, PARA UN CONTROL MAS SENCILLO
-- LA TABLA SE LLAMA PRODUCT, Y SE IDENTIFICA POR EL TIPO DE PRODUCTO
CREATE TABLE product (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_numeration VARCHAR(16) UNIQUE NOT NULL, -- numero de cuenta o de tarjeta
    card_exp_month VARCHAR(2) NULL,
    card_exp_year VARCHAR(2) NULL,
    card_cvc VARCHAR(3) NULL,
    balance DOUBLE (10,2) ,
    product_type BOOLEAN, -- 0 para las tarjetas, 1 para las cuentas
	card_type BOOLEAN NULL, -- 1 DEB , 0 CRED
    card_company_id INT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (card_company_id) REFERENCES card_company(id)
);

CREATE TABLE other_banks(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(15) -- BANRURAL, BI, BANTRAB, BAC, BAM
);


CREATE TABLE transfer_method(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(15) -- TARJETA, MISMO BANCO, OTRO BANCO (ACH)
);

CREATE TABLE transfer_detail (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    origin_product INT,
    transfer_method_id INT,
    destination_product VARCHAR(16), -- el numero de cuenta o tarjeta destino
    FOREIGN KEY (origin_product) REFERENCES product(id),
    FOREIGN KEY (transfer_method_id) REFERENCES transfer_method(id)
);

CREATE TABLE transfer (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    amount DOUBLE(10,2),
    description VARCHAR(50),
    transfer_detail_id INT,
	date DATETIME,
    FOREIGN KEY (transfer_detail_id) REFERENCES transfer_detail(id)
);
