const express = require('express');
const router = express.Router();

const Client = require('../models/clients');

router.get('/', async (req,res)=>{
    const clients = await Client.find();
  
    res.render('index',{
        clients
    });
})

router.post('/agregar',async(req,res)=>{
    const client =new Client(req.body);
    await client.save();
    res.status(200).send(res.redirect("/"))
    
})

router.delete('/eliminar/:id',async(req,res)=>{
    const {id} = req.params;
    await Client.findByIdAndDelete({_id:id},(err,removido)=>{
        if (err) return res.status(500).send("No se pudo eliminar el cliente");
        if (!removido) return res.status(404).send("No se puede eliminar este cliente");
        
    });
    res.status(200).send(res.redirect("/"))
    
})
router.get('/edit/:id',async (req,res)=>{
    const {id} = req.params;
    const client = await Client.findById(id)
    res.render('editar',{
        r_client:client
    })
})
router.put('/editar/:id',async (req,res)=>{
    
    const {id} = req.params;
    await Client.findByIdAndUpdate({_id:id},req.body,{new:true},(err,editado)=>{
        if (err) return res.status(500).send({ message: "Error en al actualizar" });
        if(!editado) return res.status(404).send({ message: "No existe el cliente" })
        const {id} = req.params;
    });
    
    res.status(200).send(res.redirect("/"))
})

module.exports = router;