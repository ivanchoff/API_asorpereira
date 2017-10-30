import mongoose from 'mongoose';

// TODO revisar este schema
const facturaSchema = new mongoose.Schema({
    tipo        : String, //compra o venta
    recogido    : String,
    material    : String,
    comprador   : String,
    vendedor    : String,
    precio      : Number,

});

const Factura = mongoose.model('Factura',facturaSchema);

export default Factura;
