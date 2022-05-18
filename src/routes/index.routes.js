import { Router } from 'express';

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/users/registerEgresados", (req, res) => {
  res.render("usersRegisterEgresados");
});

router.get("/users/registerAlumnos", (req, res) => {
  res.render("usersRegisterAlumnos");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/muro", (req, res) => {
  res.render("muro");
});

router.get("/users/modifyEgresados", (req, res) => {
  res.render("usersModifyEgresados");
});

router.get("/users/profile", (req, res) => {
  res.render("usersProfile");
});



export default router;
