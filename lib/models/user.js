import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name      : String,
  cc        : String,
  direccion : String,
  telefono  : Number,
  email     : String,
  tipo      : String,
});

const User = mongoose.model('User',userSchema);

export default User;
