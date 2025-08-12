import mysql from 'mysql2/promise';

export const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'test',
  database: 'BankApp',
  password: '123456'
});