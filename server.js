import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import knex from "knex";
import { handleRegister } from "./controllers/register.js";
import { handleSignIn } from "./controllers/signin.js";
import { askClarifai, handleImage } from "./controllers/image.js";
import { handleProfile } from "./controllers/profile.js";

const db = knex({
  client: "postgres",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "test",
    database: "FaceRDB",
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  db.select("*")
    .from("users")
    .then((data) => res.json(data));
});

app.get("/profile/:id", (req, res) => {
  handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  handleImage(req, res, db);
});

app.post("/image/api", (req, res) => {
  askClarifai(req, res);
});

app.post("/signin", (req, res) => {
  handleSignIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  handleRegister(req, res, db, bcrypt);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
