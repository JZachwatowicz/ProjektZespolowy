const db = require("../models");
const Room = db.room
const Room_type = db.room_type

exports.allRooms = async (req, res) => {
    await Room.findAll({})
    .then((rooms)=>{
        res.status(200).send(rooms);
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })
};
exports.deleteRoom = async (req, res) => {
    await Room.destroy({where:{id: req.body.id}})
    .then(() => {
        res.status(200).send({message: "Successfully deleted room."});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })
    
};
exports.addRoom = async (req, res) => {
    let data = {
        name: req.body.name,
        capacity: req.body.capacity,
        room_type_id: req.body.room_type,
        department_has_address_id : req.body.department_has_address_id
    }
    if(data.name == "" || data.name == null){
        res.status(400).send({message: "Name cannot be empty."});
    }else if(data.name.length > 45){
        res.status(400).send({message: "Name cannot exceed 45 characters."});
    } else if(isNaN(data.capacity)){
        res.status(400).send({message: "Capacity has to be a number."});
    } else if( data.room_type_id == null){
        res.status(400).send({message: "Room type cannot be empty."});
    } else {
        await Room.create(data)
        .then(() => {
            res.status(200).send({message: "Successfully created room."});
        }).catch((err) =>{
            res.status(500).send({ message: err.message });
        })
    }

}
exports.editRoom = async (req, res) => {

    await Room.findOne({
        where:{
          id: req.body.id
        }
     }).then(async (room) => {
        let data = {
            name: req.body.name,
            capacity: req.body.capacity,
            room_type_id: req.body.room_type,
            department_has_address_id: req.body.department_has_address_id
        }
     
        if(data.name == "" || data.name == null){
            res.status(400).send({message: "Name cannot be empty."});
        }else if(data.name.length > 45){
            res.status(400).send({message: "Name cannot exceed 45 characters."});
        } else if(isNaN(data.capacity)){
            res.status(400).send({message: "Capacity has to be a number."});
        } else if( data.room_type_id == null){
            res.status(400).send({message: "Room type cannot be empty."});
        } else {
            room.name = data.name;
            room.capacity = data.capacity;
            room.room_type_id = data.room_type_id;
            room.department_has_address_id = data.department_has_address_id;
            room.save({fields: ['name', 'capacity','room_type_id', 'department_has_address_id']})
            .then(() => {
                res.status(200).send({message: "Successfully updated room."});
            }).catch((err) =>{
                res.status(500).send({ message: err.message });
            })
    }}).catch((err) =>{
        res.status(500).send({ message: err.message });
     })

}
exports.getRoom = async (req, res) => {

    await Room.findOne({
        where:{
          id: req.params.id
        }
     }).then((room) => {
        res.status(200).send(room);
     }).catch((err) => {
        res.status(500).send({ message: err.message });
     })

}
exports.getRoom_types = async (req, res) => {
    await Room_type.findAll({})
    .then((types)=>{
        res.status(200).send(types);
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })
}
