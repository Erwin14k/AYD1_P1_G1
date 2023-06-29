use al_chilazo;
select * from company;
select * from product;

INSERT INTO product (company_id, product_type, product_name, product_price,
    product_description,product_img,product_number_of_sales,product_stock,product_img_key) 
    VALUES (?,?,?,?,?,?,?,?,?);
    
/*mac*/
INSERT INTO product (company_id, product_type, product_name, product_price, product_description, product_img, product_number_of_sales, product_stock, product_img_key)
VALUES
(1,'Entradas','McNuggets', 30.00,'Deliciosos trozos de pollo empanizado', 'https://mcdonalds.com.gt/imagen/menu-products/1640816959_6.%20mcnuggets%20.jpg', 0, 1,'nada'),
(1,'Entradas','Papas Fritas', 20.00,'Papas fritas crujientes y doradas', 'https://mcdonalds.com.gt/imagen/menu-products/1640817564_papas.jpg', 0, 1,'nada'),
(1,'Entradas','McFlurry Oreo', 25.00,'Helado suave con trozos de galleta Oreo', 'https://mcdonalds.com.gt/imagen/menu-products/1685989532_Boton_500x500px_McFlurry_Oreo-Chocolate.png', 0, 1,'nada'),
(1,'Entradas','McPollo', 25.00,'Delicioso sándwich con pollo empanizado', 'https://mcdonalds.com.gt/imagen/menu-products/1640816768_3.pollo%20mccrispy%202%20piezas.jpg', 0, 1,'nada'),
(1,'Entradas','Big Mac', 35.00,'Hamburguesa con dos carnes y salsa especial', 'https://mcdonalds.com.gt/imagen/menu-products/1686953720_Bigmac_700x700px_BB.png', 0, 1,'nada');

/*bk*/
INSERT INTO product (company_id, product_type, product_name, product_price, product_description, product_img, product_number_of_sales, product_stock, product_img_key)
VALUES
(2,'Entradas','Whopper', 35.00,'Hamburguesa con carne de res a la parrilla', 'https://bk.gt//images/big/2.jpg', 0, 1,'nada'),
(2,'Entradas','Crispy Chicken', 30.00,'Deliciosa hamburguesa de pollo empanizado', 'https://bk.gt//images/big/2052.jpg', 0, 1,'nada'),
(2,'Entradas','Big King', 35.00,'Hamburguesa con dos carnes de res a la parrilla', 'https://bk.gt//images/big/29.jpg', 0, 1,'nada'),
(2,'Entradas','King Nuggets', 25.00,'Deliciosos trozos de pollo empanizado', 'https://bk.gt//images/big/1540.jpg', 0, 1,'nada'),
(2,'Entradas','Cubetazo Papas', 20.00,'Papas fritas crujientes y doradas', 'https://bk.gt//images/big/2288.jpg', 0, 1,'nada');

/*walmart*/
INSERT INTO product (company_id, product_type, product_name, product_price, product_description, product_img, product_number_of_sales, product_stock, product_img_key)
VALUES
(3,'Producto Básico','Cepillo Dental Colgate Triple Acción 4 Pack', 29.00,'Pack de 4 cepillos Triple Accion Combate', 'https://walmartgt.vtexassets.com/arquivos/ids/358586-800-600?v=638175479565400000&width=800&height=600&aspect=true', 0, 1,'nada'),
(3,'Producto Básico','Aceite Marca Mazola Natural Blend - 800ml', 22.45,'Aceite marca mazona natural blend de 800ml', 'https://walmartgt.vtexassets.com/arquivos/ids/371304-800-600?v=638216950140000000&width=800&height=600&aspect=true', 0, 1,'nada'),
(3,'Producto Básico','Jabon Corporal Protex Avena 110 g 3 Pack', 35.00,'Pack de 3 jaboles Corporales Protex Acena de 100gramos', 'https://walmartgt.vtexassets.com/arquivos/ids/352077-800-600?v=638157340662000000&width=800&height=600&aspect=true', 0, 1,'nada'),
(3,'Producto Básico','Jabones LIquidos Pack', 32.25,'Jabon Liquido Corporal Palmolive Luminous Oils Higo y Orquídea Blanca Sensación Refrescante 390 ml', 'https://walmartgt.vtexassets.com/arquivos/ids/279514-800-600?v=637905595388530000&width=800&height=600&aspect=true', 0, 1,'nada'),
(3,'Producto Básico','Shampoo marca Herbal Essences Prolóngalo -1000 ml', 39.00,'Shampo de la marca Herbal Essences de 1000ml', 'https://walmartgt.vtexassets.com/arquivos/ids/365898-800-600?v=638198707198570000&width=800&height=600&aspect=truehttps://walmartgt.vtexassets.com/arquivos/ids/365898-800-600?v=638198707198570000&width=800&height=600&aspect=true', 0, 1,'nada')
;

/*tienda*/
INSERT INTO product (company_id, product_type, product_name, product_price, product_description, product_img, product_number_of_sales, product_stock, product_img_key)
VALUES
(4,'Medicamento','PRUEBA COVID FLOW FLEX X 5 TEST [CAJA]', 360.00,'*Las imágenes publicadas son ilustrativas, puede diferir ligeramente del producto final || *Recuerde ser responsable y no automedicarse, consulte siempre a su médico', 'https://www.farmaciasgaleno.com.gt/Image/Productos/3005071.JPG', 0, 1,'nada'),
(4,'Producto Básico','Escobas tradicionales', 20.00,'Escobas tradicionales super rentables COMPRA AHORA!!!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrYDQQL6LLYj7OdbflvXVWUAiIvhO_PN5gF7vamN6Ao0VeafghKH0HSXpKL-YU-yT-d3w&usqp=CAU', 0, 1,'nada'),
(4,'Medicamento','PANADOL GRIPE DIA X 16 TABLETAS [CAJA]', 26.60,'*Las imágenes publicadas son ilustrativas, puede diferir ligeramente del producto final || *Recuerde ser responsable y no automedicarse, consulte siempre a su médico', 'https://www.farmaciasgaleno.com.gt/Image/Productos/1013660.JPG', 0, 1,'nada'),
(4,'Producto Básico','Esobas Escocesa', 10.50 ,'Estas escobas son las mejores del mercado', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaHp-X8lAwWqQCF1T_9bsznjT6SJYVQy_DlA&usqp=CAU', 0, 1,'nada'),
(4,'Medicamento','ALEVE LIQUI-GELS * 8 CAPSULAS [CAJA]', 24.76,'*Las imágenes publicadas son ilustrativas, puede diferir ligeramente del producto final || *Recuerde ser responsable y no automedicarse, consulte siempre a su médico', 'https://www.farmaciasgaleno.com.gt/Image/Productos/1008171.JPG', 0, 1,'nada')
;

delete from product where product_id != 0;
    

INSERT INTO combo (company_id, combo_name, combo_price, combo_description,combo_img,combo_number_of_sales,combo_stock,combo_img_key) 
  VALUES (?,?,?,?,?,?,?,?);
/*mac*/
INSERT INTO combo  (company_id, combo_name, combo_price, combo_description,combo_img,combo_number_of_sales,combo_stock,combo_img_key) 
VALUES
(1,'McCombo Familiar 2 Adultos 2 Niños Almuerzo/Cena', 147.00,'Una deliciosa combinación para la familia.', 'https://mcdonalds.com.gt/imagen/menu-products/1640818683_familiar%202%20adultos%202%20niños.jpg', 0, 1,'nada'),
(1,'McCombo Para Todos Desayuno', 132.00,'Disfruta de este delicioso McMenú con tu familia en donde puedes elegir cuatro de las siguientes opciones: McMuffin Salchicha & Huevo, Egg McMuffin, McMuffin Salchicha, McMuffin Chapín, Hotcakes. Incluye 4 bebidas y 4 hashbrowns.', 'https://mcdonalds.com.gt/imagen/menu-products/1640719316_Para%20todos.jpg', 0, 1,'nada'),
(1,'McCombo Familiar Desayuno', 132.00,'McMenú para 4 personas, puedes elegir entre 4 opciones: McMuffin de Salchicha y Huevo, Egg McMuffin, McMuffin de Salchicha, McMuffin Tocino y Huevo, Hotcakes. Incluye hashbrown y bebidas.', 'https://s3-us-west-1.amazonaws.com/mcdonalds.delivery/gt/customer/19764.jpg', 0, 1,'nada'),
(1,'McCombo Para Todos Almuerzo/Cena', 167.00,'McMenú para 4 personas, puedes elegir entre 4 opciones: Big Mac, Cuarto de Libra, McNífica de Res o McNuggets. Incluye 4 papas medianas y 1.5 de Coca Cola o Té Frío', 'https://s3-us-west-1.amazonaws.com/mcdonalds.delivery/gt/customer/19633.jpg', 0, 1,'nada');


/*bk*/
INSERT INTO combo  (company_id, combo_name, combo_price, combo_description,combo_img,combo_number_of_sales,combo_stock,combo_img_key) 
VALUES
(2,'Crispy Cjicken con papas', 55.90,'100% pechuga de pollo empanizada, lechuga fresca, tomate y mayonesa, en un pan de papa tipo brioche. Incluye papas o aros y una bebida.', 'https://bk.gt//images/big/2062.jpg', 0, 1,'nada'),
(2,'King de Pollo con papas', 38.50,'Para los amantes del pollo les traemos una deliciosa torta de pollo empanizada y sazonada especialmente para ti con lechuga y mayonesa en pan especial. Incluye papas o aros y una bebida.', 'https://bk.gt//images/big/76.jpg', 0, 1,'nada'),
(2,'Quesoburguesa Doble con papas', 47.00,'Para los que siempre quieren más, dos tortas de carne a la parrilla, con kétchup, mostaza, crujientes pepinillos, y el exquisito queso americano que se derrite en tu boca. Incluye papas o aros y una bebida.', 'https://bk.gt//images/big/72.jpg', 0, 1,'nada'),
(2,'Mega Stacker Rodeo Triple con papas', 73.00,'Deliciosa carne de res a la parrilla, tocino, queso, salsa barbacoa y aros de cebolla. Incluye papas medianas y una bebida.', 'https://bk.gt//images/big/2234.jpg', 0, 1,'nada'),
(2,'California Whopper con papas', 61.00,'100% carne de res a la parrilla, guacamole, queso y tocino. Incluye papas y soda.', 'https://bk.gt//images/big/2501.jpg', 0, 1,'nada');




INSERT INTO company (company_name, company_description, company_category, company_email,
                      company_password,company_department,company_municipality,company_address,company_status,admin_id,company_file,company_file_key) 
                      VALUES (?,?,?,?,?,?,?,?,?,?,?,?);


 