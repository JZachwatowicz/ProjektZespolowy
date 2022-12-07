const db = require("../models");
const { address: Address, street: Street, city: City, voivodeship: Voivodeship, country: Country } = db;



exports.one_address = async (req, res) => {

    await Address.findOne({
        where: { id: req.params.id },
        include: [{
            model: Street,
            include: [{
                model: City,
                include: [{
                    model: Voivodeship,
                    include: [{
                        model: Country
                    }]
                }]
            }]
        }]
    }).then((addresses) => {
        res.status(200).send(addresses)
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })
};


exports.all_addresses = async (req, res) => {
    await Address.findAll({
        include: [{
            model: Street,
            include: [{
                model: City,
                include: [{
                    model: Voivodeship,
                    include: [{
                        model: Country
                    }]
                }]
            }]
        }]
    })
        .then((addresses) => {
            res.status(200).send(addresses);
        }).catch((err) => {
            res.status(500).send({ message: err.message });
        })

};

exports.delete_address = async (req, res) => {
    await Address.destroy({
        where: { id: req.params.id }
    })
        .then(() => {
            res.status(200).send({ message: "Successfully deleted address." });
        }).catch((err) => {
            res.status(500).send({ message: err.message });
        })

};

exports.add_address = async (req, res) => {

    const { country_name, country_code, voivodeship_name, city_name, street_name, building_number, apartment_number, voivodeship_code } = req.body
    const [country, isCountryCreated] = await Country.findOrCreate({
        where: {
            name: country_name,
            code: country_code,
        }
    })

    const [voivodeship, isVoivodeshipCreated] = await Voivodeship.findOrCreate({
        where: {
            name: voivodeship_name,
            code: voivodeship_code,
            country_id: country.id
        }
    })

    const [city, isCityCreated] = await City.findOrCreate({
        where: {
            name: city_name,
            voivodeship_id: voivodeship.id
        }
    })


    const [street, isStreetCreated] = await Street.findOrCreate({
        where: {
            name: street_name,
            city_id: city.id
        }
    })

    await Address.findOrCreate({
        where: {
            building_number: building_number,
            apartment_number: apartment_number,
            street_id: street.id
        }
    }).then((address) => {
        res.status(200).send(address[0])
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })

}
exports.edit_address = async (req, res) => {

    const { country_name, country_code, voivodeship_name, city_name, street_name, building_number, apartment_number, voivodeship_code } = req.body
    const [country, isCountryCreated] = await Country.findOrCreate({
        where: {
            name: country_name,
            code: country_code,
        }
    })

    const [voivodeship, isVoivodeshipCreated] = await Voivodeship.findOrCreate({
        where: {
            name: voivodeship_name,
            country_id: country.id,
            code: voivodeship_code
        }
    })

    const [city, isCityCreated] = await City.findOrCreate({
        where: {
            name: city_name,
            voivodeship_id: voivodeship.id
        }
    })


    const [street, isStreetCreated] = await Street.findOrCreate({
        where: {
            name: street_name,
            city_id: city.id
        }
    })

    await Address.findOne({
        where: { id: req.params.id },
        include: [{
            model: Street,
            include: [{
                model: City,
                include: [{
                    model: Voivodeship,
                    include: [{
                        model: Country
                    }]
                }]
            }]
        }]
    }).then(async data => {
        await data.update({
            id: req.params.id,
            building_number: building_number,
            apartment_number: apartment_number,
            street_id: street.id,
            street: {
                id: street.id,
                name: street_name,
                city_id: city.id,
                city: {
                    id: city.id,
                    name: city_name,
                    voivodeship_id: voivodeship.id,
                    voivodeship: {
                        id: voivodeship.id,
                        name: voivodeship_name,
                        code: voivodeship_code,
                        country_id: country.id,
                        country: {
                            id: country.id,
                            name: country_name,
                            code: country_code,
                        }
                    }
                }
            }
        })
        res.status(200).send(res => res);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });

}
