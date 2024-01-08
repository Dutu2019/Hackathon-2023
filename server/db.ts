import sql, { ConnectionOptions } from "mysql2";

const sqlConfig: ConnectionOptions = {
  host: "localhost",
  user: "Dutu",
  password: "Dutu2o!9",
  database: "app",
};

export default sql.createConnection(sqlConfig);
