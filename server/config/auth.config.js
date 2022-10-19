module.exports = {
  secret: "secret_key",

  jwtExpiration: 3600,           // 1 hour
  jwtRefreshExpiration: 86400    // 24 hours

  /* testing values */
  //jwtExpiration: 60,          // 1 minute
  //jwtRefreshExpiration: 120,  // 2 minutes
};