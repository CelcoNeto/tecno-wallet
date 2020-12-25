import app from "./app";
import "./bootstrap";
const { APP_PORT } = process.env;

app.listen(APP_PORT);
