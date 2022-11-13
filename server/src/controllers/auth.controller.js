const db = require("../models");
const config = require("../configs/auth.config");
const { user: User, refreshToken: RefreshToken, address: Address, street: Street, city: City, voivodeship: Voivodeship, country: Country } = db;
const { createUser } = require('../services/user.service');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {

  const { username, email, password, firstName, lastName, pesel, contactNumber, countryName, countryCode, voivodeshipName, cityName, streetName, buildingNumber, apartmentNumber } = req.body

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

  const [address, isAddresCreated] = await Address.findOrCreate({
    where: {
      building_number: buildingNumber,
      apartment_number: apartmentNumber,
      street_id: street.id
    }
  })

  //Save User to Database
  console.log(username, email, password, firstName, lastName, pesel, countryName)
  await createUser(username, email, password, firstName, lastName, pesel, contactNumber, address.id)
    .then(() => {
      res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });

};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration
      });

      console.log("refresh token - createToken");
      let refreshToken = await RefreshToken.createToken(user);
      console.log("refresh token - createToken");

      var authorities = [];
      user.getRole().then(role => {
        authorities.push("ROLE_" + role.name.toUpperCase());
        res.status(200).send({
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
          refreshToken: refreshToken,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

    console.log(refreshToken)

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};