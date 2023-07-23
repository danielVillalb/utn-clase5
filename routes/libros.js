const express=require('express');//llamamos a express
const router=express.Router();//llamamos a las routes de express
const Libro=require('../models/libros');//llamamos alos datos con su ubicacion
const Joi=require('joi');//llamamos a joi q fue instalada como una dependencia con npm install joi
//Joi se usa para validaciones, le decimos lo que queremos
//Schema se refire ala base de datos, Joi es un objeto ya que una base de datos seria como un entidad o clase u objeto
const libroSchema = Joi.object({
    titulo: Joi.string().required().label('Titulo'),//Debe ser un string debe ser requerido y si no esta o esta mal, se enviara al error el label "titulo o autor"
    autor: Joi.string().required().label('Autor')
    });
    // Obtener todos los libros
    router.get('/', async(req, res, next) => {
    try {
        const libros=await Libro.find()
        res.json(libros)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los libros" });
        next(error)

    }
    });
    // Obtener un libro por ID
    router.get('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;//asociamos a una variable el PATH PARAMETERS
        const libro =await Libro.findById(id);
        if (!libro) {//Si es false o indefinido hace esta accion
            const error = new Error('Libro no encontrado');
            error.status = 404;
            throw error;//envia el error al catch
        }
        res.json(libro); 
    } catch (err) {//captura el error enviado por el throw
    next(err);//le envia al siguiente middleware el err para personalizarlo
    }
    });
    // Crear un nuevo libro
    router.post('/', async(req, res, next) => {
    try {
        const { error, value } = libroSchema.validate(req.body);
        if (error) {
        const validationError = new Error('Error de validación');
        validationError.status = 400;
        validationError.details = error.details.map(detail =>
        detail.message);
        throw validationError;
    }
    const nuevoLibro=new Libro(value)//el await espera a que termine el find q es un asincrono
        await nuevoLibro.save()



    res.status(201).json(nuevoLibro);
    } catch (err) {
        res.status(500).json({ error: "Error al crear el Libro" });
        next(err)
    }
    });
    // Actualizar un libro existente
    router.put('/:id', async(req, res, next) => {
    try {
    const nuevoLibro=await Libro.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    res.json(nuevoLibro);
    } catch (err) {
        next(err);
    }
    });
    // Eliminar un libro
    router.delete('/:id', async(req, res, next) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json({message:"libro borrado"})      

    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el Libro' });
        next(err)
    }
    });
    module.exports = router;
    

















