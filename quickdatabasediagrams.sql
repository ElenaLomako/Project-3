-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE `Keys` (
    `ID` VARCHAR  NOT NULL ,
    `YEAR` int  NOT NULL ,
    `State` int  NOT NULL ,
    PRIMARY KEY (
        `ID`
    )
);

CREATE TABLE `Residential` (
    `ID` VARCHAR  NOT NULL ,
    `Revenue` int  NOT NULL ,
    `Sales` int  NOT NULL ,
    `Customers` int  NOT NULL ,
    `Price` float  NOT NULL ,
    PRIMARY KEY (
        `ID`
    )
);

CREATE TABLE `Commercial` (
    `ID` VARCHAR  NOT NULL ,
    `Revenue` int  NOT NULL ,
    `Sales` int  NOT NULL ,
    `Customers` int  NOT NULL ,
    `Price` float  NOT NULL ,
    PRIMARY KEY (
        `ID`
    )
);

CREATE TABLE `Industrial` (
    `ID` VARCHAR  NOT NULL ,
    `Revenue` int  NOT NULL ,
    `Sales` int  NOT NULL ,
    `Customers` int  NOT NULL ,
    `Price` float  NOT NULL ,
    PRIMARY KEY (
        `ID`
    )
);

CREATE TABLE `Transportation` (
    `ID` VARCHAR  NOT NULL ,
    `Revenue` int  NOT NULL ,
    `Sales` int  NOT NULL ,
    `Customers` int  NOT NULL ,
    `Price` float  NOT NULL ,
    PRIMARY KEY (
        `ID`
    )
);

CREATE TABLE `Total` (
    `ID` VARCHAR  NOT NULL ,
    `Revenue` bigint  NOT NULL ,
    `Sales` bigint  NOT NULL ,
    `Customers` int  NOT NULL ,
    `Price` float  NOT NULL ,
    PRIMARY KEY (
        `ID`
    )
);

ALTER TABLE `Residential` ADD CONSTRAINT `fk_Residential_ID` FOREIGN KEY(`ID`)
REFERENCES `Keys` (`ID`);

ALTER TABLE `Commercial` ADD CONSTRAINT `fk_Commercial_ID` FOREIGN KEY(`ID`)
REFERENCES `Keys` (`ID`);

ALTER TABLE `Industrial` ADD CONSTRAINT `fk_Industrial_ID` FOREIGN KEY(`ID`)
REFERENCES `Keys` (`ID`);

ALTER TABLE `Transportation` ADD CONSTRAINT `fk_Transportation_ID` FOREIGN KEY(`ID`)
REFERENCES `Keys` (`ID`);

ALTER TABLE `Total` ADD CONSTRAINT `fk_Total_ID` FOREIGN KEY(`ID`)
REFERENCES `Keys` (`ID`);

