const pool = require("./config/db.js");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

require("./routes/user/user.js")(app, pool);
require("./routes/todos/todos.js")(app, pool);
require("./routes/auth/auth.js")(app, pool);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})