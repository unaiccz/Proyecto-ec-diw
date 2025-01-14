import Apuntes from '../models/Apuntes.js';
import Examenes from '../models/Examenes.js';
import Tareas from '../models/Tareas.js';
import { Router } from 'express';

const router = Router();

// ...existing code...

router.delete('/apuntes/:id', async (req, res) => {
  try {
    const apuntes = await Apuntes.findByIdAndDelete(req.params.id);
    if (!apuntes) {
      return res.status(404).json({ message: 'Apunte no encontrado' });
    }
    console.log('DELETE /apuntes/:id', apuntes); // Log para depuración
    res.json({ message: 'Apunte eliminado' });
  } catch (error) {
    console.error('Error en DELETE /apuntes/:id:', error); // Log de error
    res.status(500).json({ message: error.message });
  }
});

router.delete('/examenes/:id', async (req, res) => {
  try {
    const examenes = await Examenes.findByIdAndDelete(req.params.id);
    if (!examenes) {
      return res.status(404).json({ message: 'Examen no encontrado' });
    }
    console.log('DELETE /examenes/:id', examenes); // Log para depuración
    res.json({ message: 'Examen eliminado' });
  } catch (error) {
    console.error('Error en DELETE /examenes/:id:', error); // Log de error
    res.status(500).json({ message: error.message });
  }
});

router.delete('/tareas/:id', async (req, res) => {
  try {
    const tareas = await Tareas.findByIdAndDelete(req.params.id);
    if (!tareas) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    console.log('DELETE /tareas/:id', tareas); // Log para depuración
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    console.error('Error en DELETE /tareas/:id:', error); // Log de error
    res.status(500).json({ message: error.message });
  }
});

// ...existing code...

export default router;