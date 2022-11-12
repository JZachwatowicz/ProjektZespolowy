const db = require("../models");
const Activity = db.activity

exports.all_activities = async (req, res) => {

    await Activity.findAll({})
    .then((activities)=>{
        res.status(200).send(activities);
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })
    
};
exports.delete_activity = async (req, res) => {

     await Activity.destroy({where:{id: req.body.id}})
    .then(() => {
        res.status(200).send({message: "Successfully deleted activity."});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })
    
};
exports.add_activity = async (req, res) => {
    
    let data = {
        name: req.body.name,
        description: req.body.description
    }
    if(data.name == "" || data.name == null){
        res.status(400).send({message: "Name cannot be empty."});
    }
    else if(data.name.length > 100){
        res.status(400).send({message: "Name cannot exceed 100 characters."});
    } else if(data.description.length > 250){
        res.status(400).send({message: "Description cannot exceed 250 characters."});
    } else {
        await Activity.create(data)
        .then(() => {
            res.status(200).send({message: "Successfully created actiivty."});
        }).catch((err) =>{
            res.status(500).send({ message: err.message });
        })
    }
}
exports.edit_activity = async (req, res) => {

    await Activity.findOne({
        where:{
          id: req.body.id
        }
     }).then(async (activity) => {
        let data = {
            name: req.body.name,
            description: req.body.description
        }
        if(data.name == "" || data.name == null){
            res.status(400).send({message: "Name cannot be empty."});
        }
        else if(data.name.length > 100){
            res.status(400).send({message: "Name cannot exceed 100 characters."});
        } else if(data.description.length > 250){
            res.status(400).send({message: "Description cannot exceed 250 characters."});
        } else {
            activity.name = data.name;
            activity.description = (data.description == null ? '' :  data.description)
            await activity.save({fields: ['name', 'description']})
            .then(()=>{
                res.status(200).send({message: "Successfully updated activity."});
            }).catch((err=>{
                res.status(500).send({ message: err.message });
            }))
        }
     }).catch((err) =>{
        res.status(500).send({ message: err.message });
     })

}
exports.one_activity = async (req, res) => {

    await Activity.findOne({
        where:{
          id: req.params.id
        }
     }).then((activity) => {
        res.status(200).send(activity);
     }).catch((err) => {
        res.status(500).send({ message: err.message });
     })

}
