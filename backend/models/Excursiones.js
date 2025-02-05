import mongoose from "mongoose";

const ExcursionesSchema = new mongoose.Schema({
    Destino:{
        type: String,
        required: true
    },
    Fecha:{
        type: String,
        required: true
    },
    Enseres:{
        type: String,
        required: true
    },
    Asistencia:{
        type: String,
        required: true
    }
});
const Excursiones = mongoose.model('Excursiones', ExcursionesSchema);
export default Excursiones;