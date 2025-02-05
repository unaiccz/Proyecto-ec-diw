import Apuntes from '../models/Apuntes.js';
import Examenes from '../models/Examenes.js';
import Tareas from '../models/Tareas.js';
import Reuniones from '../models/Reuniones.js';
import Excursiones from '../models/Excursiones.js';
import { Router } from 'express';

const router = Router();

router.get('/apuntes', async (req, res) => {
  try {
    const apuntes = await Apuntes.find();
    if (apuntes.length === 0) {
      res.json({ message: 'No hay apuntes' });
    } else {
      console.log('GET /apuntes', apuntes); // Log para depuración
      res.json(apuntes);
    }
  } catch (error) {
    console.error('Error en GET /apuntes:', error); // Log de error
    res.status(500).json({ message: error.message });
  }
});

router.post('/apuntes', async (req, res) => {
  const apuntes = new Apuntes({
    Asignatura: req.body.Asignatura,
    Tema: req.body.Tema,
    Apuntes: req.body.Apuntes,
  });
  try {
    const newApuntes = await apuntes.save();
    console.log('POST /apuntes', newApuntes); // Log para depuración
    res.status(201).json(newApuntes);
  } catch (error) {
    console.error('Error en POST /apuntes:', error); // Log de error
    res.status(400).json({ message: error.message });
  }
});

router.put('/apuntes/:id', async (req, res) => {
  try {
    const updatedApuntes = await Apuntes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedApuntes) {
      res.status(404).json({ message: 'Apunte no encontrado' });
    } else {
      console.log('PUT /apuntes', updatedApuntes); // Log para depuración
      res.json(updatedApuntes);
    }
  } catch (error) {
    console.error('Error en PUT /apuntes:', error); // Log de error
    res.status(500).json({ message: error.message });
    res.status(400).json({ message: error.message });
  }
});

router.delete('/apuntes/:id', async (req, res) => {
  try {
    const apuntes = await Apuntes.findByIdAndDelete(req.params.id);
    if (!apuntes) {
      res.status(404).json({ message: 'Apunte no encontrado' });
    } else {
      console.log('DELETE /apuntes', apuntes); // Log para depuración
      res.json({ message: 'Apunte eliminado' });
    }
  } catch (error) {
    console.error('Error en DELETE /apuntes:', error); // Log de error
    res.status(500).json({ message: error.message });
  }
});

router.get('/examenes', async (req, res) => {
  try {
    const examenes = await Examenes.find();
    console.log('GET /examenes', examenes); // Log para depuración
    res.json(examenes);
  } catch (error) {
    console.error('Error en GET /examenes:', error); // Log de error
    res.status(500).json({ message: error.message });
  }
});

router.post('/examenes', async (req, res) => {
  const examenes = new Examenes({
    Fecha: req.body.Fecha,
    Asignatura: req.body.Asignatura,
    Temas: req.body.Temas,
  });
  try {
    const newExamenes = await examenes.save();
    console.log('POST /examenes', newExamenes); // Log para depuración
    res.status(201).json(newExamenes);
  } catch (error) {
    console.error('Error en POST /examenes:', error); // Log de error
    res.status(400).json({ message: error.message });
  }
});

router.put('/examenes/:id', async (req, res) => {
  try {
    const updatedExamenes = await Examenes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExamenes) {
      res.status(404).json({ message: 'Examen no encontrado' });
    } else {
      console.log('PUT /examenes', updatedExamenes); // Log para depuración
      res.json(updatedExamenes);
    }
  } catch (error) {
    console.error('Error en PUT /examenes:', error); // Log de error
    res.status(500).json({ message: error.message });
    res.status(400).json({ message: error.message });
  }
});

router.delete('/examenes/:id', async (req, res) => {
  try {
    const examenes = await Examenes.findByIdAndDelete(req.params.id);
    if (!examenes) {
      res.status(404).json({ message: 'Examen no encontrado' });
    } else {
      console.log('DELETE /examenes', examenes); // Log para depuración
      res.json({ message: 'Examen eliminado' });
    }
  } catch (error) {
    console.error('Error en DELETE /examenes:', error); // Log de error
    res.status(500).json({ message: error.message });
  }
});

router.get('/tareas', async (req, res) => {
  try {
    const tareas = await Tareas.find();
    console.log('GET /tareas', tareas); // Log para depuración
    res.json(tareas);
  } catch (error) {
    console.error('Error en GET /tareas:', error); // Log de error
    res.status(500).json({ message: error.message });
  }
});

router.post('/tareas', async (req, res) => {
  const tareas = new Tareas({
    Asignatura: req.body.Asignatura,
    Tareas: req.body.Tareas,
    FechaLimite: req.body.FechaLimite,
    DatosInteres: req.body.DatosInteres
  });
  try {
    const newTareas = await tareas.save();
    console.log('POST /tareas', newTareas); // Log para depuración
    res.status(201).json(newTareas);
  } catch (error) {
    console.error('Error en POST /tareas:', error); // Log de error
    res.status(400).json({ message: error.message });
  }
});

router.put('/tareas/:id', async (req, res) => {
  try {
    const updatedTareas = await Tareas.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTareas) {
      res.status(404).json({ message: 'Tarea no encontrada' });
    } else {
      console.log('PUT /tareas', updatedTareas); // Log para depuración
      res.json(updatedTareas);
    }
  } catch (error) {
    console.error('Error en PUT /tareas:', error); // Log de error
    res.status(500).json({ message: error.message });
    res.status(400).json({ message: error.message });
  }
});

router.delete('/tareas/:id', async (req, res) => {
  try {
    const tareas = await Tareas.findByIdAndDelete(req.params.id);
    if (!tareas) {
      res.status(404).json({ message: 'Tarea no encontrada' });
    } else {
      console.log('DELETE /tareas', tareas); // Log para depuración
      res.json({ message: 'Tarea eliminada' });
    }
  } catch (error) {
    console.error('Error en DELETE /tareas:', error); // Log de error
    res.status(500).json({ message: error.message });
  }
});

// Endpoints para Reuniones
router.get('/reuniones', async (req, res) => {
  try {
    const reuniones = await Reuniones.find();
    console.log('GET /reuniones', reuniones); // Log para depuración
    res.json(reuniones);
  } catch (error) {
    console.error('Error en GET /reuniones:', error); // Log de error
    res.status(500).json({ message: error.message });
  }
});

router.post('/reuniones', async (req, res) => {
  const reuniones = new Reuniones({
Fecha: req.body.Fecha,
Clase : req.body.Clase,
Alumno: req.body.Alumno,
Anotaciones: req.body.Anotaciones
  });
  try {
    const newReuniones = await reuniones.save();
    console.log('POST /reuniones', newReuniones); // Log para depuración
    res.status(201).json(newReuniones);
  } catch (error) {
    console.error('Error en POST /reuniones:', error); // Log de error
    res.status(400).json({ message: error.message });
  }
});

router.put('/reuniones/:id', async (req, res) => {
  try {
    const updatedReuniones = await Reuniones.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReuniones) {
      res.status(404).json({ message: 'Reunión no encontrada' });
    } else {
      console.log('PUT /reuniones', updatedReuniones); // Log para depuración
      res.json(updatedReuniones);
    }
  } catch (error) {
    console.error('Error en PUT /reuniones:', error); // Log de error
    res.status(400).json({ message: error.message });
  }
});

router.delete('/reuniones/:id', async (req, res) => {
  try {
    const reuniones = await Reuniones.findByIdAndDelete(req.params.id);
    if (!reuniones) {
      res.status(404).json({ message: 'Reunión no encontrada' });
    } else {
      console.log('DELETE /reuniones', reuniones); // Log para depuración
      res.json({ message: 'Reunión eliminada' });
    }
  } catch (error) {
    console.error('Error en DELETE /reuniones:', error); // Log de error
    res.status(500).json({ message: error.message });
  }
});

// Endpoints para Excursiones
router.get('/excursiones', async (req, res) => {
  try {
    const excursiones = await Excursiones.find();
    console.log('GET /excursiones', excursiones); // Log para depuración
    res.json(excursiones);
  } catch (error) {
    console.error('Error en GET /excursiones:', error); // Log de error
    res.status(500).json({ message: error.message });
  }
});

router.post('/excursiones', async (req, res) => {
  const excursiones = new Excursiones({
    Destino: req.body.Destino,
    Fecha: req.body.Fecha,
    Enseres: req.body.Enseres,
    Asistencia: req.body.Asistencia,
  });
  try {
    const newExcursiones = await excursiones.save();
    console.log('POST /excursiones', newExcursiones); // Log para depuración
    res.status(201).json(newExcursiones);
  } catch (error) {
    console.error('Error en POST /excursiones:', error); // Log de error
    res.status(400).json({ message: error.message });
  }
});

router.put('/excursiones/:id', async (req, res) => {
  try {
    const updatedExcursiones = await Excursiones.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExcursiones) {
      res.status(404).json({ message: 'Excursión no encontrada' });
    } else {
      console.log('PUT /excursiones', updatedExcursiones); // Log para depuración
      res.json(updatedExcursiones);
    }
  } catch (error) {
    console.error('Error en PUT /excursiones:', error); // Log de error
    res.status(400).json({ message: error.message });
  }
});

router.delete('/excursiones/:id', async (req, res) => {
  try {
    const excursiones = await Excursiones.findByIdAndDelete(req.params.id);
    if (!excursiones) {
      res.status(404).json({ message: 'Excursión no encontrada' });
    } else {
      console.log('DELETE /excursiones', excursiones); // Log para depuración
      res.json({ message: 'Excursión eliminada' });
    }
  } catch (error) {
    console.error('Error en DELETE /excursiones:', error); // Log de error
    res.status(500).json({ message: error.message });
  }
});

export default router;