 const app = require('../server');
 let chai = require('chai');
 let chaiHttp = require('chai-http');
 let should = chai.should();
 const db = require("../src/models");
 const { user: User } = db;
 let TestUserSIGNUP = {
   id: 0,
   username: "SignupTEST",
   password: "password",
   email: "SignupTEST@email.test",
   firstName : "Test",
     lastName: "Test",
     pesel: "00000000000",
     contactNumber: "000000000",
     building_number: 0,
     apartment_number: 0,
     street_name: "Test",
     city_name: "Przemyśl",
     voivodeship_name: "Podkarpackie Voivodeship",
     country_name: "Poland",
     country_code: "PL"
 };
 let TestUserSIGNIN = {
    id: 0,
    username: "SigninTEST",
    password: "password",
    email: "SigninTEST@email.test",
    firstName : "Test",
      lastName: "Test",
      pesel: "00000000001",
      contactNumber: "000000001",
      building_number: 0,
      apartment_number: 0,
      street_name: "Test",
      city_name: "Przemyśl",
      voivodeship_name: "Podkarpackie Voivodeship",
      country_name: "Poland",
      country_code: "PL"
  };
 chai.use(chaiHttp);
 describe("Authentication", () => {
   before( async () => {
      await User.destroy({
      where: {pesel: TestUserSIGNUP.pesel}
    });
    await User.destroy({
        where: {pesel: TestUserSIGNIN.pesel}
      });
   });
     
       describe("/SIGNUP User" ,() => {
        it("it should REGISTER User and RETURN user data", (done) => {
          chai
           .request(app)
           .post("/api/auth/signup")
           .send(TestUserSIGNUP)
           .end((err, res) => {
             token = res.body.token;
             res.should.have.status(200);
             should.exist(res.body);
             done();
           });
        });
      });
     describe("/SIGNIN User" ,() => {
        before( (done) => {
        chai
          .request(app)
          .post("/api/auth/signup")
          .send(TestUserSIGNIN)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        });
      it("it should SIGNIN User and RETURN token", (done) => {
        chai
         .request(app)
         .post("/api/auth/signin")
         .send({username: TestUserSIGNIN.username, password: TestUserSIGNIN.password})
         .end((err, res) => {
           token = res.body.token;
           res.should.have.status(200);
           should.exist(res.body.accessToken);
           done();
         });
      });
    });
 });