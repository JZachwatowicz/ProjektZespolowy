const app = require('../server');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const db = require("../src/models");
const { user: User, address: Address } = db;
const UserService = require("../src/services/user.service")
chai.use(chaiHttp);
var bcrypt = require("bcryptjs");
const { response } = require('../server');

let TestUser = {
  username: "AddressTEST",
  password: "password",
  email: "RoomTEST@email.test",
  firstName : "Test",
    lastName: "Test",
    pesel: "00000000003",
    contactNumber: "000000003",
    address_id: 1,
    role_id: 3
};

let TestAddress = {
    building_number: 0,
    apartment_number: 0,
    city_name: "Przemyśl",
    country_name: "Poland",
    country_code: "PL",
    street_name: "Test",
    voivodeship_code: "Lub",
    voivodeship_name: "Lubelskie",
}

let token = "";

describe("Address", () => {
   before( async () => {
      await User.destroy({
      where: {pesel: TestUser.pesel}
    });
    await User.create({
      username: TestUser.username,
      email: TestUser.email,
      password: bcrypt.hashSync(TestUser.password, 8),
      first_name: TestUser.firstName,
      last_name: TestUser.lastName,
      birth_date: Date.now(),
      pesel: TestUser.pesel,
      contact_number: TestUser.contactNumber,
      role_id: TestUser.role_id,
    })
  });
  beforeEach( (done) => {
    chai
    .request(app)
    .post("/api/auth/signin")
    .send({username: TestUser.username, password: TestUser.password})
    .end((err, res) => {
      res.should.have.status(200);
      should.exist(res.body.accessToken);
      token = res.body.accessToken;
      done();
    });
  });

   describe("/POST Address" ,() => {
      it("it should POST Address", (done) => {
         chai
         .request(app)
         .post("/api/address/add")
         .set({'x-access-token': token})
         .send(TestAddress)
         .end((err, res) => {
           res.should.have.status(200);
           should.exist(res.body);
           done();
         });
    });
 });
     describe("/GET Addresses" ,() => {
      it("it should GET all Addresses", (done) => {
         chai
         .request(app)
         .get("/api/address/get")
         .set({'x-access-token': token})
         .end((err, res) => {
           res.should.have.status(200);
           should.exist(res.body);
           done();
         });
    });
 });

 describe("/GET ONE Address" ,() => {
     let GETaddress = {};
     before(async () => {
        GETaddress = await Address.create(TestAddress);
       })
     it("it should GET one Adress",  (done) => {
        chai
        .request(app)
        .get("/api/address/get/" + GETaddress.id)
        .set({'x-access-token': token})
        .end((err, res) => {
          res.should.have.status(200);
          should.exist(res.body);
          done();
        });
   });
 });
    after(async () => {
        Address.destroy({
            where : {
                apartment_number: 0,
                building_number: 0
            }
        });
        User.destroy({
          where: {pesel: TestUser.pesel}
        });
    })
   
});
