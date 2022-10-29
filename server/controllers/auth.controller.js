const db = require("../models");
const config = require("../config/auth.config");
const { user: User, refreshToken: RefreshToken, address: Address, street: Street, city: City, voivodeship: Voivodeship, country: Country } = db;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = async (req, res) => {


  const [country, isCountryCreated] = await Country.findOrCreate({
    where: {
      name: req.body.country_name,
      code: req.body.country_code,
    }
  })

  const [voivodeship, isVoivodeshipCreated] = await Voivodeship.findOrCreate({
    where: {
      name: req.body.voivodeship_name,
      code: req.body.voivodeship_code,
      country_id: country.id
    }
  })

  const [city, isCityCreated] = await City.findOrCreate({
    where: {
      name: req.body.city_name,
      voivodeship_id: voivodeship.id
    }
  })


  const [street, isStreetCreated] = await Street.findOrCreate({
    where: {
      name: req.body.street_name,
      city_id: city.id
    }
  })

  const [address, isAddresCreated] = await Address.findOrCreate({
    where: {
      building_number: req.body.building_number,
      apartment_number: req.body.apartment_number,
      street_id: street.id
    }
  })

  //Save User to Database
  await User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birth_date: req.body.birth_date,
    pesel: req.body.pesel,
    contact_number: req.body.contact_number,
    address_id: address.id
  })
    .then(user => {
      // use this to debug mistakes if something would be happening
      // console.log(country.toJSON())
      // console.log(voivodeship.toJSON())
      // console.log(city.toJSON())
      // console.log(street.toJSON())
      // console.log(address.toJSON())
      // console.log(user.toJSON())
      user.setRole(1).then(() => {
        res.send({ message: "User was registered successfully!" });
      });
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

      let refreshToken = await RefreshToken.createToken(user);

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