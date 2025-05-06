const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;

//setting up ejs and file serving
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app/views"));

//home page
app.get("/", (req, res) => {
  res.render("index", {
    css: ["nav.css", "common.css", "footer.css", "index.css"],
    js: ["index.js"],
    title: "Example App",
  });
});

//color pages
app.get("/:color", (req, res) => {
  const color = req.params.color;
  res.render("color", {
    color,
    colorName: color.charAt(0).toUpperCase() + color.slice(1),
    css: [
      "nav.css",
      "common.css",
      "footer.css",
      `${color}.css`,
      `${color}-index.css`,
    ],
    js: [`${color}.js`],
    title: `${color.charAt(0).toUpperCase() + color.slice(1)} Pages`,
  });
});

//color-size pages
app.get("/:color/:size", (req, res) => {
  const { color, size } = req.params;

  res.render("color-size", {
    color,
    size,
    colorName: color.charAt(0).toUpperCase() + color.slice(1),
    css: [
      "nav.css",
      "common.css",
      "footer.css",
      `${color}.css`,
      `font${size}.css`,
      "button.css",
    ],
    js: [`${color}.js`],
    title: `${color.charAt(0).toUpperCase() + color.slice(1)} Pages`,
  });
});

//start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
