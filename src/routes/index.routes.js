import { Router } from 'express';
import registerEgresados from "../models/registerEgresados";
import registerAlumnos from "../models/registerAlumnos";

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

router.post("/users/registerEgresados/add", async(req, res) => {
  const newegresado=registerEgresados(req.body)
  const egresadoSaved=await newegresado.save()
  console.log(egresadoSaved)
  res.send('usuario registrad');
});

router.get("/users/registerAlumnos", (req, res) => {
  res.render("usersRegisterAlumnos");
});

router.post("/users/registerAlumnops/add", async(req, res) => {
  const newalumno=registerAlumnos(req.body)
  const alumnoSaved=await newalumno.save()
  console.log(alumnoSaved)
  res.send('usuario registrad');
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

router.get("/bolsa", (req, res) => {
  res.render("bolsacarrusel");
});


export default router;
