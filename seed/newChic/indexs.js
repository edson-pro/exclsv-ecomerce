import jsdom from "jsdom";
import axios from "axios";
import express from "express";
import fs from "fs";
const { JSDOM } = jsdom;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  var data = fs.readFileSync("./products.json", "utf8");
  var prods = JSON.parse(data);
  return res.json(prods.filter((e) => e.images.length !== 0));
});

app.listen(5000, () => console.log("li"));
