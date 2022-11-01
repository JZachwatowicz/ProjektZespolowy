const db = require("../models");
var bcrypt = require("bcryptjs");
const { user: User } = db

const createUser = async (
    username, email, password, firstName, lastName,
    birthDate, pesel, contactNumber, addressId) => {
    await User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 8),
        first_name: firstName,
        last_name: lastName,
        birth_date: birthDate,
        pesel: pesel,
        contact_number: contactNumber,
        address_id: addressId
    }).then(user => {
        user.setRole(1)
    })
}

module.exports = {
    createUser
}