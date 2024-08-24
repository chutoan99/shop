const path = require('path');
const fs = require('fs');

export const mysqlFilePath = fs.readFileSync(path.join(__dirname, './mysql.sql')).toString();

console.log(mysqlFilePath,"mysqlFilePath")