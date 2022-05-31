//Ignacio Ordaz
import express from "express";
import indexRoutes from "./routes/index.routes";
//import exphbs from 'express-handlebars'; es el de abajo pero ya no da error el de abajo
const exphbs = require("express-handlebars");
import path from "path";
import morgan from "morgan";
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

//init
const app = express();

//settings
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main", 
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
  })
);
app.set("view engine", ".hbs");

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

//Routes
app.use(indexRoutes);


//static files
app.use(express.static(path.join(__dirname, "public")));

export default app;
//Ignacio Ordaz aq