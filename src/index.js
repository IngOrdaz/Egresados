//Ignacio Ordaz
import app from "./app";
import './config';
import './database';
//ejemplo de branch
app.listen(process.env.PORT);
console.log("Server on port", process.env.PORT || 3001);
//Ignacio Ordaz