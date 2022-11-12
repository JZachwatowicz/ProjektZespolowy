const moment = require( "moment");
const db = require("../models");
const Item = db.item

exports.all_items = async (req, res) => {
    await Item.findAll({})
    .then((items)=>{
        res.status(200).send(items);
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })
};
exports.delete_item = async (req, res) => {
    await Item.destroy({where:{id: req.body.id}})
    .then(() => {
        res.status(200).send({message: "Successfully deleted item."});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })
    
};
exports.add_item = async (req, res) => {
    let data = {
        name: req.body.name,
        serial_number: req.body.serial_number,
        possesion_date: req.body.possesion_date,
        item_type_id : req.body.item_type
    }
    if(data.name == "" || data.name == null){
        res.status(400).send({message: "Name cannot be empty."});
    }else if(data.name.length > 45){
        res.status(400).send({message: "Name cannot exceed 45 characters."});
    } else if(data.serial_number.length > 45){
        res.status(400).send({message: "Serial number cannot exceed 45 characters."});
    } else if( !moment(data.possesion_date, moment.ISO_8601, true ).isValid()){
        res.status(400).send({message: "Date format should be YYYY-MM-DD."});
    } else if( data.item_type_id == null){
        res.status(400).send({message: "Item type cannot be empty."});
    } else {
        await Item.create(data)
        .then(() => {
            res.status(200).send({message: "Successfully created item."});
        }).catch((err) =>{
            res.status(500).send({ message: err.message });
        })
    }

}
exports.edit_item = async (req, res) => {

    await Item.findOne({
        where:{
          id: req.body.id
        }
     }).then(async (item) => {
        let data = {
            name: req.body.name,
            serial_number: req.body.serial_number,
            possesion_date: req.body.possesion_date,
            item_type_id : req.body.item_type
        }
     
        if(data.name == "" || data.name == null){
            res.status(400).send({message: "Name cannot be empty."});
        }else if(data.name.length > 45){
            res.status(400).send({message: "Name cannot exceed 45 characters."});
        } else if(data.serial_number.length > 45){
            res.status(400).send({message: "Serial number cannot exceed 45 characters."});
        } else if( !moment(data.possesion_date, moment.ISO_8601, true ).isValid()){
            res.status(400).send({message: "Invalid date format. Date format should be YYYY-MM-DD."});
        } else if( data.item_type_id == null){
            res.status(400).send({message: "Item type cannot be empty."});
        } else {
            item.name = data.name;
            item.serial_number = data.serial_number;
            item.possesion_date = data.possesion_date;
            item.item_type_id = data.item_type_id
            item.save({fields: ['name', 'serial_number', 'possesion_date', 'item_type']})
            .then(() => {
                res.status(200).send({message: "Successfully updated item."});
            }).catch((err) =>{
                res.status(500).send({ message: err.message });
            })
    }}).catch((err) =>{
        res.status(500).send({ message: err.message });
     })

}
exports.one_item = async (req, res) => {

    await Item.findOne({
        where:{
          id: req.params.id
        }
     }).then((item) => {
        res.status(200).send(item);
     }).catch((err) => {
        res.status(500).send({ message: err.message });
     })

}
