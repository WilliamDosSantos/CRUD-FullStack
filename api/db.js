import mysql from "mysql2";
import migration from "mysql-migrations";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "willdev123",
  database: "crud",
});

db.getConnection(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

migration.init(db, __dirname + "/migrations", () => {
  console.log("ran migration...");
});
