import { Schema, model } from "mongoose";
const bcrypt = require("bcryptjs");

const registerEgresadosSchema = new Schema(
  {
    Nombre: {
      type: String,
      trim: true,
      require: true,
    },
    A_Paterno: {
      type: String,
      trim: true,
      require: true,
    },
    A_Materno: {
      type: String,
      trim: true,
      require: true,
    },
    Correo: {
      type: String,
      trim: true,
      require: true,
      unique: true,
    },
    Telefono: {
      type: String,
      require: true,
      trim: true,
    },
    Ciudad: {
      type: String,
      trim: true,
      require: true,
    },
    Carrera: {
      type: String,
      trim: true,
      require: true,
    },
    Especialidad: {
      type: String,
      trim: true,
      require: true,
    },
    Empresa: {
      type: String,
      require: true,
      trim: true,
      require: true,
    },
    Puesto: {
      type: String,
      require: true,
      trim: true,
    },
    CV: {
      type: String,
      trim: true,
    },
    Usuario: {
      type: String,
      trim: true,
      require: true,
      unique: true,
    },
    Contraseña: {
      type: String,
      trim: true,
      require: true,
    },
  },
  {
    //permite agregar created at y updated at
    timestamps: true,
    versionKey: false,
  }
);

//bcrypt password
registerEgresadosSchema.methods.encryptPassword = async (Contraseña) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(Contraseña, salt);
  return hash;
};


//registerEgresadosSchema.methods.matchPassword= async function(Contraseña){
  //  return await bcrypt.compare(Contraseña,this.Contraseña)
//}
export default model("Egresados", registerEgresadosSchema);
