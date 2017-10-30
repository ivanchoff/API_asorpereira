import mongoose from 'mongoose';

// TODO Revisar este schema
const rutaSchema = new mongoose.Schema({
  responsable   : String,
  nombre        : String,
  descripcion   : String,
  frecuencia    : Number,
});

const Ruta = mongoose.model('Ruta',rutaSchema);

export default Ruta;
