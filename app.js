const express=require('express');//llamamos al express packete instalado con npm install express
const app=express();//creamos la app express
app.use(express.json());//decimos que vamos a usar datos en formato json

const port=3100;//indicamos el porto

const librosRouter=require('./routes/libros');//indicamos el routeo
const errorHandler=require('./middlewares/errorHandler');//llamamos al middleware


app.use('/libros',librosRouter);//indicamos que cuando usemos /libros se vaya al routeo de librosRoutes

app.use(errorHandler);//use el middlewares 
app.listen(port,()=>{
    console.log('Servidor en funcionamiento');//el liste hace que inicie el
})
app.get('/hola',(req,res)=>{

    res.send("hola mundo, edad: ")
})
// app.listen(port,()=>{
//     console.log('servidor con express')
// })



















// const Chance=require('chance')
// let chance=new Chance();
// let edad= chance.name();
// console.log(edad)









