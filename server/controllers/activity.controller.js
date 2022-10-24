const db = require("../models");
const Activity = db.activity
exports.allActivities = async (req, res) => {
    let activities = await Activity.findAll()
    res.status(200).send(activities);
};
exports.deleteActivity = async (req, res) => {
     await Activity.destroy({where:{id: req.body.id,},})
    .then(result => 
        res.status(200).send("Deleted activity.")
      )
      .catch(error => console.error(error))
    
};
exports.addActivity = async (req, res) => {

    let info = {
        name: req.body.name,
        description: req.body.description
    }

    const activity = await Activity.create(info)
    res.status(200).send(activity)
    console.log(activity)

}
