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

router.get("/password/recover", (req, res) => {
  res.render("recoverPassword");
});

router.get("/users/muro", (req, res) => {
  res.render("muroUsers");
});

router.get("/users/admin/muro", (req, res) => {
  res.render("muroAdministrar");
});


router.get("/users/modifyEgresados", (req, res) => {
  res.render("usersModifyEgresados");
});

router.get("/users/modifyAlumnos", (req, res) => {
  res.render("usersModifyAlumnos");
});

router.get("/users/profileStudent", (req, res) => {
  res.render("profileStudent");
});

router.get("/users/profileEgresado", (req, res) => {
  res.render("profileEgresado");
});


export default router;
