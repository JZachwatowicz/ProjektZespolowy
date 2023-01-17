 const app = require('../server');
 let chai = require('chai');
 let chaiHttp = require('chai-http');
 let should = chai.should();
 const db = require("../src/models");
 const { user: User } = db;
 const UserService = require("../src/services/user.service")
 chai.use(chaiHttp);
 var bcrypt = require("bcryptjs");
 
 let TestAdmin = {
  username: "TESTAdmin",
  password: "password",
  email: "TESTAdmin@email.test",
  firstName : "Test",
    lastName: "Test",
    pesel: "00000000007",
    contactNumber: "000000007",
    role_id: 3
};
 let TestUserREGISTER = {
  contact_number: "100000000",
   email: "TestUserREGISTER@email.test",
   first_name : "Test",
   last_name: "Test",
   password: "password",
     pesel: "75032129452",
     role_id: 1,
     username: "TestUserREGISTER"
 };
 let TestUserSIGNIN = {
    id: 0,
    username: "SigninTEST",
    password: "password",
    email: "SigninTEST@email.test",
    firstName : "Test",
      lastName: "Test",
      pesel: "00290469871",
      role_id: 1,
      contactNumber: "000000001",
  };
 chai.use(chaiHttp);
 describe("Authentication", () => {
   before( async () => {
      await User.destroy({
      where: {pesel: TestUserREGISTER.pesel}
    });
    await User.destroy({
        where: {pesel: TestUserSIGNIN.pesel}
      });
    await User.create({
      username: TestUserSIGNIN.username,
      email: TestUserSIGNIN.email,
      password: bcrypt.hashSync(TestUserSIGNIN.password, 8),
      first_name: TestUserSIGNIN.firstName,
      last_name: TestUserSIGNIN.lastName,
      birth_date: Date.now(),
      pesel: TestUserSIGNIN.pesel,
      contact_number: TestUserSIGNIN.contactNumber,
      role_id: TestUserSIGNIN.role_id,
    });
    await User.destroy({
      where: {pesel: TestAdmin.pesel}
    });
   await User.create({
     username: TestAdmin.username,
     email: TestAdmin.email,
     password: bcrypt.hashSync(TestAdmin.password, 8),
     first_name: TestAdmin.firstName,
     last_name: TestAdmin.lastName,
     birth_date: Date.now(),
     pesel: TestAdmin.pesel,
     contact_number: TestAdmin.contactNumber,
     role_id: TestAdmin.role_id,
      });
  });
  after(async () => {
    User.destroy({
      where: {pesel: TestAdmin.pesel}
    });
    User.destroy({
      where: {pesel: TestUserREGISTER.pesel}
    });
    User.destroy({
      where: {pesel: TestUserSIGNIN.pesel}
    });
  });

    describe("/ADD User" ,() => {
      let token = "";
    before( (done) => {
      chai
        .request(app)
        .post("/api/auth/signin")
        .send({username: TestAdmin.username, password: TestAdmin.password})
        .end((err, res) => {
          res.should.have.status(200);
          should.exist(res.body.accessToken);
          token = res.body.accessToken;
          console.log(token)
          done();
        });
      });
        it("it should ADD User and RETURN user data", (done) => {
          chai
           .request(app)
           .post("/api/test/add")
           .set({'x-access-token': token})
           .send(TestUserREGISTER)
           .end((err, res) => {
             token = res.body.token;
             res.should.have.status(200);
             should.exist(res.body);
             done();
           });
        });
      });

     describe("/SIGNIN User" ,() => {
      it("it should SIGNIN User and RETURN token", (done) => {
        chai
         .request(app)
         .post("/api/auth/signin")
         .send({username: "SigninTEST", password: "password"})
         .end((err, res) => {
           token = res.body.token;
           res.should.have.status(200);
           should.exist(res.body.accessToken);
           done();
         });
      });
    });
 });