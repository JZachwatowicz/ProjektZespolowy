const db = require("../models");
const { address: Address, street: Street, city: City, voivodeship: Voivodeship, country: Country } = db;
const { createUser } = require('../services/user.service');
const { street, article, address } = require("../models");






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

        .then((addresses) => {
            res.status(200).send(addresses);
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

    const { countryName, countryCode, voivodeshipName, cityName, streetName, buildingNumber, apartmentNumber } = req.body
    const [country, isCountryCreated] = await Country.findOrCreate({
        where: {
            name: countryName,
            code: countryCode,
        }
    })

    const [voivodeship, isVoivodeshipCreated] = await Voivodeship.findOrCreate({
        where: {
            name: voivodeshipName,
            country_id: country.id
        }
    })

    const [city, isCityCreated] = await City.findOrCreate({
        where: {
            name: cityName,
            voivodeship_id: voivodeship.id
        }
    })


    const [street, isStreetCreated] = await Street.findOrCreate({
        where: {
            name: streetName,
            city_id: city.id
        }
    })

    await Address.findOrCreate({
        where: {
            building_number: buildingNumber,
            apartment_number: apartmentNumber,
            street_id: street.id
        }
    }).then(() => {
        res.status(200).send({ message: "Successfully created adress." });
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })

}
exports.edit_address = async (req, res) => {

    const { countryName, countryCode, voivodeshipName, cityName, streetName, buildingNumber, apartmentNumber } = req.body
    const [country, isCountryCreated] = await Country.findOrCreate({
        where: {
            name: countryName,
            code: countryCode,
        }
    })

    const [voivodeship, isVoivodeshipCreated] = await Voivodeship.findOrCreate({
        where: {
            name: voivodeshipName,
            country_id: country.id
        }
    })

    const [city, isCityCreated] = await City.findOrCreate({
        where: {
            name: cityName,
            voivodeship_id: voivodeship.id
        }
    })


    const [street, isStreetCreated] = await Street.findOrCreate({
        where: {
            name: streetName,
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
        await data.update({id: req.params.id,
        building_number: buildingNumber,
        apartment_number: apartmentNumber,
        street_id: street.id,
        street: {
            id: street.id,
            name: streetName,
            city_id: city.id,
            city: {
                id: city.id,
                name: cityName,
                voivodeship_id: voivodeship.id,
                voivodeship: {
                    id: voivodeship.id,
                    name: voivodeshipName,
                    country_id: country.id,
                    country: {
                        id: country.id,
                        name: countryName,
                        code: countryCode,
                    }
                }
            }
        }})
        res.status(200).send("Update address.");
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });

    // await Article.findOne({
    //     where: { id: req.params.id }
    // }).then(article => {
    //     console.log(article);
    //     article.set({
    //         title: req.body.title,
    //         content: req.body.content
    //     });

    //     article.save({
    //         fields: ['title', 'content']
    //     });
    //     res.status(200).send("Update article.");
    // }).catch(err => {
    //     res.status(500).send({ message: err.message });
    // });

}
