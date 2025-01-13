import mongoose from 'mongoose';
const TareasSchema = new mongoose.Schema({
    Asignatura: {
        type: String,
        required: true
    },
    Tareas: {
        type: String,
        required: true
    },
    FechaLimite: {
        type: String,
        required: true
    },
    DatosInteres: {
        type: String
    }
});

 const Tareas = mongoose.model('Tareas', TareasSchema);
 export default Tareas;
