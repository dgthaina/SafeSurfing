DROP SCHEMA IF EXISTS seguranca_jovens;

CREATE SCHEMA seguranca_jovens;

USE seguranca_jovens;

CREATE TABLE administradores (
	usuario VARCHAR(30) PRIMARY KEY,
    senha CHAR(64) NOT NULL
);

CREATE TABLE inscritos (
	email VARCHAR(255) PRIMARY KEY,
    codigo CHAR(36) UNIQUE
);

CREATE TABLE emails (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(255) NOT NULL,
	conteudo JSON,
    enviado BOOLEAN DEFAULT false
);