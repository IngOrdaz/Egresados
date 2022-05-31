import { Router } from "express";
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

router.post("/users/registerEgresados/add", async (req, res) => {
  try {
    const {
      Nombre,
      A_Paterno,
      A_Materno,
      Correo,
      Telefono,
      Ciudad,
      Carrera,
      Especialidad,
      Empresa,
      Puesto,
      CV,
      Usuario,
      Contraseña,
    } = req.body;
    const addEgresado = new registerEgresados({
      Nombre,
      A_Paterno,
      A_Materno,
      Correo,
      Telefono,
      Ciudad,
      Carrera,
      Especialidad,
      Empresa,
      Puesto,
      CV,
      Usuario,
      Contraseña,
    });
    addEgresado.Contraseña = await addEgresado.encryptPassword(Contraseña);
    const newEgresado = await addEgresado.save();
    console.log(newEgresado);
    res.redirect("/users/registerEgresados");
  } catch (error) {
    console.log(error);
  }
});

//save and register alumnos
router.get("/users/registerAlumnos", (req, res) => {
  res.render("usersRegisterAlumnos");
});

router.post("/users/registerAlumnops/add", async (req, res) => {
  try {
    const {
      Nombre,
      A_Paterno,
      A_Materno,
      Correo,
      Telefono,
      Ciudad,
      Carrera,
      Especialidad,
      Semestre,
      Usuario,
      Contraseña,
    } = req.body;
    const addAlumno = new registerAlumnos({
      Nombre,
      A_Paterno,
      A_Materno,
      Correo,
      Telefono,
      Ciudad,
      Carrera,
      Especialidad,
      Semestre,
      Usuario,
      Contraseña,
    });
    addAlumno.Contraseña = await addAlumno.encryptPassword(Contraseña);
    const newAlumno = await addAlumno.save();
    console.log(newAlumno);
    res.redirect("/users/registerAlumnos");
  } catch (error) {
    console.log(error);
  }
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

//edit alumnos
router.get("/users/modifyAlumnos/:id", async (req, res) => {
  try {
    const alu = await registerAlumnos.findById(req.params.id).lean();
    console.log(alu);
    res.render("usersModifyAlumnos",{alu});
  } catch (error) {
      res.render('usersModifyAlumnos')
  }

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
