import { Schema, model } from "mongoose";

const registerPublicacionSchema = new Schema(
  {
    Descripcion: {
      type: String,
      trim: true,
    },
    Titulo: {
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

export default model("Publicaciones", registerPublicacionSchema);