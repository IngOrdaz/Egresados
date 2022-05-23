import {Schema,model} from 'mongoose';

const registerAlumnosSchema =new Schema( 
    {
    Nombre: {
        type: String,
        trim:true,
        require:true
    },
    A_Paterno: {
        type: String,
        trim:true,
        require:true
    },
    A_Materno: {
        type: String,
        trim:true,
        require:true
    },    
    Correo: {
        type: String,
        trim:true,
        require:true,
        unique: true
    },
    Telefono:{
        type: String,
        require:true,
        trim:true
    },
    Ciudad: {
        type: String,
        trim:true,
        require:true
    },
    Carrera: {
        type: String,
        trim:true,
        require:true,
    },
    Semestre: {
        type: String,
        trim:true,
        require:true,
    },
    Especialidad: {
        type: String,
        trim:true,
        require:true
    },
    Usuario: {
        type: String,
        trim:true,
        require:true,
        unique: true
    },
    Contraseña: {
        type: String,
        trim:true,
        require:true
    }},
    {
        //permite agregar created at y updated at
        timestamps: true,
        versionKey:false
    }
);
export default model('Alumnos', registerAlumnosSchema);