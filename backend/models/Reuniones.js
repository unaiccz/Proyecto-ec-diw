import mongoose from 'mongoose';


const ReunionesSchema = new mongoose.Schema({
    Fecha:{
        type: String,
        required: true
    },
    Clase :{
        type: String,
        required: true
    },
    Alumno:{
        type: String,
        required: true
    },
    Anotaciones:{
        type: String,
        required: true
    }
});
const Reuniones = mongoose.model('Reuniones', ReunionesSchema);
export default Reuniones;