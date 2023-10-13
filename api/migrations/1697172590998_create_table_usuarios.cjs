module.exports = {
    "up": "CREATE TABLE usuarios (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, fone VARCHAR(255) NOT NULL, data_nascimento INT NOT NULL)",
    "down": "DROP TABLE usuarios"
}