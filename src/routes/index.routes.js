import { Router } from "express";
import registerEgresados from "../models/registerEgresados";
import registerAlumnos from "../models/registerAlumnos";
import registerPublicacion from "../models/registerPublicacion";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/password/recover", (req, res) => {
  res.render("recoverPassword");
});

router.get("/about", (req, res) => {
  res.render("about");
});

//#region Registrar Egresados
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
//#endregion

//#region Registrar Alumnos
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
//#endregion

router.get("/users/muro", async (req, res) => {
  const publica = await registerPublicacion.find({}).lean();
  console.log(publica)
  res.render("muroUsers", { publica });
});

router.get("/users/admin/muro", async (req, res) => {
  const publica = await registerPublicacion.find({}).lean();
  console.log(publica)
  res.render("muroAdministrar", { publica });
});

router.post("/users/admin/muro/add", async (req, res) => {
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

//Funcionamiento de json
router.get("/exportarDB", async (req, res) => {
  const alumnos = await registerAlumnos.find().lean();
  const nombre1 = alumnos[0].Nombre;
  alumnos[0].Nombre = "ArmafuGOD";
  const nombre2 = alumnos[0].Nombre;
  res.json(nombre2);
});

router.get("/users/modifyEgresado/:id", async (req, res) => {
  const egre = await registerEgresados.findById(req.params.id).lean();
  console.log(egre)
  res.render("usersModifyEgresados", { egre });
});

//#region Modificar Alumnos
router.get("/users/modifyAlumno/:id", async (req, res) => {
  const alu = await registerAlumnos.findById(req.params.id).lean();
  console.log(alu)
  res.render("usersModifyAlumnos", { alu });
});
router.post("/users/modifyAlumn0s/:id", async (req, res) => {
  try {
    const {
      Correo,
      Telefono,
      Ciudad,
      Semestre
    } = req.body;
    const newAlu = new registerAlumnos({
      Correo,
      Telefono,
      Ciudad,
      Semestre
    });
    const newData = { "Correo": Correo, "Telefono": Telefono, "Ciudad": Ciudad, "Semestre": Semestre };
    const alu = await registerAlumnos.findByIdAndUpdate(req.params.id, newData);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});
//#endregion

router.get("/users/profileStudent", async (req, res) => {
  const usuarios = await registerAlumnos.find({}).lean();
  console.log(usuarios)
  res.render("profileStudent", { usuarios });
});

router.get("/users/profileEgresado", async (req, res) => {
  const usuariose = await registerEgresados.find({}).lean();

  console.log(usuariose)
  res.render("profileEgresado", { usuariose });
});

router.get("/bolsa", (req, res) => {
  res.render("bolsacarrusel");
});

export default router;