import { Router } from "express";
import registerEgresados from "../models/registerEgresados";
import registerAlumnos from "../models/registerAlumnos";
import registerPublicacion from "../models/registerPublicacion";

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
    res.redirect("/login");
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
    res.redirect("/login");
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

router.get("/users/muro", async(req, res) => {
  const publica = await registerPublicacion.find({}).lean();
  console.log(publica)
  res.render("muroUsers",{
    publica
  });
});

router.get("/users/admin/muro", async(req, res) => {
  const publica = await registerPublicacion.find({}).lean();
  console.log(publica)
  res.render("muroAdministrar",{
    publica
  });
});

router.post("/users/admin/muro/add", async(req, res) => {
  try {
    const {
      Descripcion,
      Titulo,
    } = req.body;
    const addPubli = new registerPublicacion({
      Descripcion,
      Titulo,
    });
    const newPubli = await addPubli.save();
    console.log(newPubli);
    res.redirect("/users/admin/muro");
  } catch (error) {
    console.log(error);
  }
});

router.get("/users/modifyEgresados", (req, res) => {
  res.render("usersModifyEgresados");
});

router.get("/users/modifyAlumnos", (req, res) => {
  res.render("usersModifyAlumnos");
});

router.get("/users/profileStudent", async (req, res) => {
  
  const usuarios = await registerAlumnos.find({}).lean();

  console.log(usuarios)

  res.render("profileStudent",{
    usuarios
  });
});

router.get("/users/profileEgresado", async(req, res) => {
  const usuariose = await registerEgresados.find({}).lean();

  console.log(usuariose)
  res.render("profileEgresado",{
    usuariose
  });
});

router.get("/bolsa", (req, res) => {
  res.render("bolsacarrusel");
});

export default router;