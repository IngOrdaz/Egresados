import { Router } from "express";
import registerEgresados from "../models/registerEgresados";
import registerAlumnos from "../models/registerAlumnos";
import registerPublicacion from "../models/registerPublicacion";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

//Funcionamiento de json
router.get("/exportarDB", async (req, res) => {
  const alumnos = await registerAlumnos.find().lean();
  const nombre1 = alumnos[0].Nombre;
  alumnos[0].Nombre = "ArmafuGOD";
  const nombre2 = alumnos[0].Nombre;
  res.json(nombre2);
});

router.get("/login", async (req, res) => {
  const usuarios = await registerAlumnos.find({}).lean();
  const mandar = [{"alumno": usuarios[0].Nombre, "apellido": usuarios[0].A_Paterno}, {"alumno": usuarios[1].Nombre, "apellido": usuarios[1].A_Paterno}]
  console.log(mandar)
  res.render("login", { mandar });
});

//Hace falta
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

router.get("/admin/muro", async (req, res) => {
  const publica = await registerPublicacion.find({}).lean();
  console.log(publica)
  res.render("muroAdministrar", { publica });
});

router.get("/users/profileAlumno/:id", async (req, res) => {
  try {
    const alu = await registerAlumnos.findById(req.params.id).lean();
    console.log(alu)
    res.render("profileOneStudent", { alu });
  } catch (error) {
    console.log(error);
    res.render("El Alumno No Existe");
  }
});

router.post("/admin/muro/add", async (req, res) => {
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
    res.redirect("/admin/muro");
  } catch (error) {
    console.log(error);
  }
});


//#region Modificar Egresados
router.get("/users/modifyEgresado/:id", async (req, res) => {
  try {
    const egre = await registerEgresados.findById(req.params.id).lean();
    console.log(egre)
    res.render("usersModifyEgresados", { egre });
  } catch (error) {
    console.log(error);
    res.render("El Egresado No Existe")
  }
});
router.post("/users/modifyEgresad0s/:id", async (req, res) => {
  try {
    const {
      Correo,
      Telefono,
      Ciudad,
      Empresa,
      Puesto,
      CV
    } = req.body;
    const newEgre = new registerEgresados({
      Correo,
      Telefono,
      Ciudad,
      Empresa,
      Puesto,
      CV
    });

    if (CV != "") {
      const newData = { "Correo": Correo, "Telefono": Telefono, "Ciudad": Ciudad, "Empresa": Empresa, "Puesto": Puesto, "CV": CV };
      await registerEgresados.findByIdAndUpdate(req.params.id, newData);
    } else {
      const newData = { "Correo": Correo, "Telefono": Telefono, "Ciudad": Ciudad, "Empresa": Empresa, "Puesto": Puesto };
      await registerEgresados.findByIdAndUpdate(req.params.id, newData);
    }
    res.redirect("/admin/profileEgresados");
  } catch (error) {
    console.log(error);
  }
});
//#endregion

//#region Modificar Alumnos
router.get("/users/modifyAlumno/:id", async (req, res) => {
  try {
    const alu = await registerAlumnos.findById(req.params.id).lean();
    console.log(alu)
    res.render("usersModifyAlumnos", { alu });
  } catch (error) {
    console.log(error);
    res.render("El Alumno No Existe");
  }
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
    res.redirect("/admin/profileStudents");
  } catch (error) {
    console.log(error);
  }
});
//#endregion

router.get("/admin/profileStudents", async (req, res) => {
  const usuarios = await registerAlumnos.find({}).lean();
  console.log(usuarios)
  res.render("profileStudent", { usuarios });
});

router.get("/admin/profileEgresados", async (req, res) => {
  const usuariose = await registerEgresados.find({}).lean();
  console.log(usuariose)
  res.render("profileEgresado", { usuariose });
});

router.get("/bolsa", (req, res) => {
  res.render("bolsacarrusel");
});

export default router;