const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index', { user: null }); // Renders the homepage
  });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  });

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

module.exports = app;
