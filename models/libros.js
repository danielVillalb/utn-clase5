const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/biblioteca",{
    useUnifiedTopology: true,
    useNewUrlParser: true
});
//definimos el esquema y modelo de la tabla clientes*/

const libroSchema=new mongoose.Schema({
    id:Number,
    titulo:String,
    autor:String
},{collection:"libros"});
const Libro=mongoose.model("Libro",libroSchema);
module.exports=Libro;