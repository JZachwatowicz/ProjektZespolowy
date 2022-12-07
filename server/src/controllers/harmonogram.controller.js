const db = require("../models");
const { harmonogram: Harmonogram } = db;

const Op = db.Sequelize.Op;

exports.all_harmonograms = async (req, res) => {
    var begin = req.query.begin_date ? {begin_date: {[Op.gte]: req.query.begin_date}}: {};
    var end = req.query.end_date ? {end_date: {[Op.lte]: req.query.end_date}}: {};
    var user_id = req.query.user_id ? {user_id: req.query.user_id}: {};
    var admin_consent = req.query.admin_consent ? {admin_consent: req.query.admin_consent}: {};
    var room_id = req.query.room_id ? {room_id: req.query.room_id}: {};
    var item_id = req.query.item_id ? {item_id: req.query.item_id}: {};

    var now = new Date();

    var condition = {
        where: {
            [Op.and]: [
                begin,
                end,
                user_id,
                admin_consent,
                room_id,
                item_id,
                {end_date: {[Op.lte]: now}}
            ]
        }
    };

    await Harmonogram.findAll({condition, order: ['begin_date']})
    .then(harmonograms => {
        res.status(200).send(harmonograms)
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.all_user_reserved = async (req, res) => {
    
    

    await Harmonogram.findAll({where : {user_id :  req.params.id}, order: ['begin_date']})
    .then(harmonograms => {
        res.status(200).send(harmonograms)
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.all_pending = async (req, res) => {
    
    

    await Harmonogram.findAll({where : {admin_consent : 0}, order: ['begin_date']})
    .then(harmonograms => {
        res.status(200).send(harmonograms)
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.add_harmonogram = async (req, res) => {
    let data = {
        begin_date: req.body.begin_date,
        end_date: req.body.end_date,
        user_id: req.body.user_id,
        room_id: req.body.room_id,
        item_id: req.body.item_id

    }

    
    if(data.item_id != null){
        let harmonograms = await Harmonogram.findAll({where : {item_id: data.item_id , [Op.or] : [
            { [Op.and] : {begin_date : {[Op.lte] : data.begin_date}, end_date : {[Op.gte] : data.begin_date}}} ,
            { [Op.and] : {begin_date : {[Op.lte] : data.end_date}, end_date : {[Op.gte] : data.end_date}} },
            { [Op.and] : {begin_date : {[Op.lte] : data.begin_date}, end_date : {[Op.gte] : data.end_date}}} ]}, });
        if(harmonograms.length != 0){
            res.status(500).send({ message: "This item is allready researved for this time." });
            return;
        }
    }
    if(data.room_id != null){
        let harmonograms = await Harmonogram.findAll({where : {room_id: data.room_id , [Op.or] : [
            { [Op.and] : {begin_date : {[Op.lte] : data.begin_date}, end_date : {[Op.gte] : data.begin_date}}} ,
            { [Op.and] : {begin_date : {[Op.lte] : data.end_date}, end_date : {[Op.gte] : data.end_date}} },
            { [Op.and] : {begin_date : {[Op.lte] : data.begin_date}, end_date : {[Op.gte] : data.end_date}}} ]}, });
        if(harmonograms.length != 0){
            res.status(500).send({ message: "This room is allready researved for this time." });
            return;
        }
    }
    
        await Harmonogram.create(data).then(harmonogram => {
            res.send({ message: "Harmonogram added.", data: harmonogram });
        }).catch(err => {
            console.log(err.message);
            res.status(500).send({ message: err.message  });
        });
    
    

    
};

exports.one_harmonogram = async (req, res) => {
    await Harmonogram.findOne({
        where: {id: req.params.id},
        //include: ["users", "rooms", "items"]
    }).then(harmonogram => {
        res.status(200).send(harmonogram);
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.edit_harmonogram = async (req, res) => {
    await Harmonogram.findOne({
        where: {id: req.params.id}
    }).then(harmonogram => {
        harmonogram.set({
            begin_date: req.body.begin_date,
            end_date: req.body.end_date
        });
        harmonogram.save({
            fields: ['begin_date', 'end_date']
        });
        res.status(200).send("Harmonogram updated.");
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.delete_harmonogram = async (req, res) => {
    await Harmonogram.findOne({
        where: {id: req.params.id}
    }).then(harmonogram => {
        harmonogram.destroy();
        res.status(200).send("Harmonogram deleted.");
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
}

exports.accept_harmonogram = async (req, res) => {
    await Harmonogram.findOne({
        where: {id: req.params.id}
    }).then(harmonogram => {
        harmonogram.set({
            admin_consent: 1
        });
        harmonogram.save({
            fields: ['admin_consent']
        });
        res.status(200).send("Harmonogram accepted.");
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
}