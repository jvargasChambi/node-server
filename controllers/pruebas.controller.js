const { response, request, json } = require('express');
const { googleVerify } = require('../helpers/google-verify');
const Usuario = require('../database/models/usuario');
const Sala = require('../database/models/sala');


const pruebasPost = (req = request, res = response)=>{
    console.log(req.body);
    console.log(req.body.Payments);
    console.log(req.body.data);
    const body = req.body;
    res.json(
        {
            msg:'succes',
            body,
            x: body.data,
            pay: body.data.Payments
        })
}

const validateLogin = async(req = request, res = response) => {
    console.log(req.body);
    var succ=true;
    var user_ = ""
    var mensaje="";
    const {correo, password} = req.body;
    const usr = await Usuario.findOne({ correo, password });
    if (!usr) {
        succ = false;
        mensaje = "Datos Invalidos"
    }else{
        user_=usr.user;
    } 
    res.json(
        {
            succes:succ,
            mensaje:mensaje,
            user:user_
        })
}

const validateUser = async( req = request, res = response ) => {
    var nombre ="INVALIDO";
    const { user } = req.params;
    const usr = await Usuario.findOne({ user });

    if (usr) {
        nombre = usr.nombre ;    
    } 

    res.json({
        mesg:'succes',
        name: nombre
    })
}

const obtenerSalas = async(req = request, res = response) => {
    var salas = await Sala.find();    
    res.json( salas );
}

const validateRoom = async(req = request, res = response)=>{
   
    const { room }=  req.params;
    const room_db = await Sala.findOne({ nombre:room });
    if (!room_db){
        res.status(400).json(
            {
                msg : "Sala Invalida"
            }
        );
    }else{
        res.json({
            nombre: room_db.nombre,
            content:room_db.txtDiagram
        });
    }
}

const singGoogle = async (req = request, res = response) => {
    console.log(req.body);
    const {id_token} = req.body;
    try {
        const { name, picture, email } = await googleVerify(id_token);
        
        res.json({
            id_token : email
        });
    } catch ( error ) {
        // json.status(400).json({
        //     ok : false,
        //     msg: 'Token invalido'
        // });
    }
   
}

const createUser = async(req = request, res = response) => {
    const body = req.body; 
    var bandera = true;
    var mensaje = "";
    const {nombre, correo, user, password} = req.body;
    //validar que no exista
    console.log(correo);
    const usr = await Usuario.findOne({ correo });
    console.log(usr);
    if (usr) {
        bandera = false;
        mensaje = "Correo Ya registrado"
    }else{
        mensaje = "Registro creado Correctamente"
    }
    const usuario = new Usuario( body );
    await usuario.save();
    res.json(
        {
            succes:bandera,
            mensaje:mensaje,
            data: user
        });
}

    const createSala = async(req = request, res = response) => {
        const body = req.body; 
        const {nombre, user} = req.body;
        var mensaje = "";
        var bandera = true;
        //validar que no exista
        const room = await Sala.findOne({ nombre });
        if (room) {
            bandera = false;
            mensaje = "Ya existe una sala con el mismo nombre";
        } else {
            const room_new = new Sala( body );
            await room_new.save();
            mensaje = "Sala Creada";
        }

        res.json(
            {
                succes:bandera,
                mensaje:mensaje
            });
       // console.log(usr);
       
    }

    const updateSala = async(req = request, res = response) => {
        const body = req.body; 
        const {nombre, txtDiagram} = req.body;
        var mensaje = "";
        var bandera = true; 
        //validar que no exista
        const room = await Sala.findOneAndUpdate({ nombre }, { txtDiagram });      
        res.json(
            {
                succes:bandera,
                mensaje:mensaje
            });
    }

    const eliminarSala = async(req = request, res = response) => {
        const body = req.body; 
        const {nombre, user} = req.body;
        var mensaje = "";
        var bandera = true;
        //validar que no exista
        const room = await Sala.deleteOne({ nombre, user });
        if (room.deletedCount != 1) {
            bandera = false;
            mensaje = "No se encontro sala a eliminar";
        } else {           
            mensaje = "Sala Eliminada";
        }

        res.json(
            {
                succes:bandera,
                mensaje:mensaje
            });
    }



module.exports = {
    pruebasPost,
    validateUser,
    validateRoom,
    validateLogin,
    obtenerSalas,
    singGoogle,
    createUser,
    createSala,
    updateSala  ,
    eliminarSala  
}