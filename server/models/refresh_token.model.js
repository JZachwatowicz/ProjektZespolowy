const config = require("../config/auth.config");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
    const RefreshToken = sequelize.define("refresh_tokens", {
        token: {
            type: Sequelize.STRING,
        },
        expiry_date: {
            type: Sequelize.DATE,
        },
    });

    RefreshToken.createToken = async function (user) {
        console.log("createToken function");
        let expired_at = new Date();

        expired_at.setSeconds(expired_at.getSeconds() + config.jwtRefreshExpiration);

        let _token = uuidv4();

        let refresh_token = await this.create({
            token: _token,
            user_id: user.id,
            expiry_date: expired_at.getTime(),
        });

        return refresh_token.token;
    };

    RefreshToken.verifyExpiration = (token) => {
        return token.expiry_date.getTime() < new Date().getTime();
    };

    return RefreshToken;
};