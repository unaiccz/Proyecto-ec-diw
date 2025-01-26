import express from 'express';
import cors from 'cors'; // prevent CORS errors
import connectDB from './database/db.js'; // connect to database
import router from './controllers/Controller.js'; // import the router
connectDB();

const port = 444;
const app = express();

app.use(cors());
app.use(express.json()); // parse JSON bodies

// Conectar a la base de datos

app.use('/api', router); // use the router

app.listen(port, '192.168.5.136',  () => {
  console.log(`Server running on port ${port}`);
});