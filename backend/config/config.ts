module.exports = {
  "development": {
    "username": "root",
    "password": "rootroot",
    "database": "database",
    "host": "localhost",
    "dialect": "mysql",
    "port": "3307"
  },
  "test": {
    "username": "root",
    "password": "rootroot",
    "database": "database",
    "host": "localhost",
    "dialect": "mysql",
    "port": process.env.DATABASE_PORT
  },
  "production": {
    "username": "root",
    "password": "rootroot",
    "database": "database",
    "host": "localhost",
    "dialect": "mysql",
    "port": process.env.DATABASE_PORT
  }
}