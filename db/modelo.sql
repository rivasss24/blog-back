CREATE DATABASE equaldata_prueba;

USE equaldata_prueba;

CREATE TABLE usuarios(
    uid INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(50) NOT NULL,
    userEmail VARCHAR(50) NOT NULL,
    userPassword VARCHAR(60) NOT NULL,
    userImg TEXT NOT NULL,
    estado BOOLEAN DEFAULT true
);

CREATE TABLE posts(
    id INT PRIMARY KEY AUTO_INCREMENT,
    postTitle VARCHAR( 100 ) NOT NULL,
    postDescription VARCHAR( 200 ) NOT NULL,
    postContent LONGTEXT NOT NULL,
    postDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uid INT NOT NULL,
    postImg TEXT NOT NULL,
    estado BOOLEAN DEFAULT true,
    FOREIGN KEY ( uid ) REFERENCES usuarios ( uid )
);