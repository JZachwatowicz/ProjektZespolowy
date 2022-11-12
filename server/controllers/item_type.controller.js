const db = require("../models");
const Item_type = db.item_type

exports.getItem_types = async (req, res) => {
    await Item_type.findAll({})
    .then((types)=>{
        res.status(200).send(types);
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })
}
exports.addItem_type = async (req, res) => {
    let data = {
        name: req.body.name
    }
    if(data.name == "" || data.name == null){
        res.status(400).send({message: "Name cannot be empty."});
    } else if(data.name.length > 45){
        res.status(400).send({message: "Name cannot exceed 45 characters."});
    } else {
        await Item_type.create(data)
        .then(() => {
            res.status(200).send({message: "Successfully created item type."});
        }).catch((err) =>{
            res.status(500).send({ message: err.message });
        })
    }
}
exports.deleteItem_type = async (req, res) => {
    await Item_type.destroy({where:{id: req.body.id}})
    .then(() => {
        res.status(200).send({message: "Successfully deleted item type."});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })
    
};
exports.editItem_type = async (req, res) => {

    await Item_type.findOne({
        where:{
          id: req.body.id
        }
     }).then(async (item_type) => {
        let data = {
            name: req.body.name
        }
     
        if(data.name == "" || data.name == null){
            res.status(400).send({message: "Name cannot be empty."});
        }else if(data.name.length > 45){
            res.status(400).send({message: "Name cannot exceed 45 characters."});
        } else {
            item_type.name = data.name;
            item_type.save({fields: ['name']})
            .then(() => {
                res.status(200).send({message: "Successfully updated item type."});
            }).catch((err) =>{
                res.status(500).send({ message: err.message });
            })
    }}).catch((err) =>{
        res.status(500).send({ message: err.message });
     })

}
exports.getItem_type = async (req, res) => {

    await Item_type.findOne({
        where:{
          id: req.params.id
        }
     }).then((item_type) => {
        res.status(200).send(item_type);
     }).catch((err) => {
        res.status(500).send({ message: err.message });
     })

}