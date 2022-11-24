const db = require("../models");
const config = require("../configs/auth.config");
const { user: User, refreshToken: RefreshToken, address: Address, street: Street, city: City, voivodeship: Voivodeship, country: Country } = db;
const { createUser } = require('../services/user.service');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { address, city } = require("../models");

exports.signup = async (req, res) => {

  const { username, email, password, firstName, lastName, pesel, contactNumber, country_name, country_code, voivodeship_name, city_name, street_name, building_number, apartment_number } = req.body

  const [country, isCountryCreated] = await Country.findOrCreate({
    where: {
      name: country_name,
      code: country_code,
    }
  })

  const [voivodeship, isVoivodeshipCreated] = await Voivodeship.findOrCreate({
    where: {
      name: voivodeship_name,
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

  const [address, isAddresCreated] = await Address.findOrCreate({
    where: {
      building_number: building_number,
      apartment_number: apartment_number,
      street_id: street.id
    }
  })

  //Save User to Database
  console.log(username, email, password, firstName, lastName, pesel, country_name)
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
      user.getRole()
      .then(role => {
        authorities.push("ROLE_" + role.name.toUpperCase());
              res.status(200).send({
                id: user.id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                roles: authorities,
                accessToken: token,
                refreshToken: refreshToken,
        })


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