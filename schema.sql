--Drop table if exist
--DROP TABLE IF EXISTS keys;
--DROP TABLE IF EXISTS residential;
--DROP TABLE IF EXISTS commercial;
--DROP TABLE IF EXISTS industrial;
--DROP TABLE IF EXISTS transportation;
--DROP TABLE IF EXISTS total;


-- Create new table
CREATE TABLE keys(
	id VARCHAR (10) NOT NULL PRIMARY KEY, 
	year INT NOT NULL,
	state VARCHAR (2) NOT NULL
	
);

SELECT * FROM keys;

-- import the keys table 

-- Create new table
CREATE TABLE residential(
	id VARCHAR (10) NOT NULL PRIMARY KEY, 
	revenue INT NOT NULL,
	sales INT NOT NULL,
	customers INT NOT NULL,
	price FLOAT NOT NULL,
	FOREIGN KEY (id) REFERENCES keys(id)
);

SELECT * FROM residential;

-- import the residential table 

-- Create new table
CREATE TABLE commercial(
	id VARCHAR (10) NOT NULL PRIMARY KEY, 
	revenue INT NOT NULL,
	sales INT NOT NULL,
	customers INT NOT NULL,
	price FLOAT NOT NULL,
	FOREIGN KEY (id) REFERENCES keys(id)
);

SELECT * FROM commercial;

-- import the commercial table 

-- Create new table
CREATE TABLE industrial(
	id VARCHAR (10) NOT NULL PRIMARY KEY, 
	revenue INT NOT NULL,
	sales INT NOT NULL,
	customers INT NOT NULL,
	price FLOAT NOT NULL,
	FOREIGN KEY (id) REFERENCES keys(id)
);

SELECT * FROM industrial;

-- import the industrial table 

-- Create new table
CREATE TABLE transportation(
	id VARCHAR (10) NOT NULL PRIMARY KEY, 
	revenue INT NOT NULL,
	sales INT NOT NULL,
	customers INT NOT NULL,
	price FLOAT NOT NULL,
	FOREIGN KEY (id) REFERENCES keys(id)
);

SELECT * FROM transportation;

-- import the transportation table 

-- Create new table
CREATE TABLE total(
	id VARCHAR (10) NOT NULL PRIMARY KEY, 
	revenue BIGINT NOT NULL,
	sales BIGINT NOT NULL,
	customers INT NOT NULL,
	price FLOAT NOT NULL,
	FOREIGN KEY (id) REFERENCES keys(id)
);

SELECT * FROM total;

-- import the total table 
