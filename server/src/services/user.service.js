const db = require("../models");
var bcrypt = require("bcryptjs");
const { user: User } = db

const rozkodujPesel = (pesel) =>
{
    //pobranie daty
    var rok     = parseInt(pesel.substring(0,2),10);
    var miesiac = parseInt(pesel.substring(2,4),10)-1;
    var dzien   = parseInt(pesel.substring(4,6),10);

    if(miesiac >= 80)
    {
        rok += 1800;
        miesiac = miesiac - 80;
    }
    else if(miesiac >= 60)
    {
        rok += 2200;
        miesiac = miesiac - 60;
    }
    else if (miesiac >= 40)
    {
        rok += 2100;
        miesiac = miesiac-40;
    }
    else if (miesiac >= 20)
    {
        rok += 2000;
        miesiac = miesiac - 20;
    }
    else
    {
        rok += 1900;
    }

    var dataUrodzenia = new Date();
    dataUrodzenia.setFullYear(rok, miesiac, dzien);
   
    return dataUrodzenia
}

const createUser = async (
    username, email, password, firstName, lastName,
    pesel, contactNumber, addressId) => {

    await User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 8),
        first_name: firstName,
        last_name: lastName,
        birth_date: rozkodujPesel(pesel),
        pesel: pesel,
        contact_number: contactNumber,
        address_id: addressId
    }).then(user => {
        user.setRole(1)
    })
}

const createUserRole = async (
    username, email, password, firstName, lastName,
    pesel, contactNumber, role_id) => {
    await User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 8),
        first_name: firstName,
        last_name: lastName,
        birth_date: rozkodujPesel(pesel),
        pesel: pesel,
        contact_number: contactNumber,
        role_id: role_id,
    })
}

module.exports = {
    createUser,
    createUserRole
}