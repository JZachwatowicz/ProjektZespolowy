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
  username: "RoomTEST",
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
    street_name: "Test",
    city_name: "Przemyśl",
    voivodeship_name: "Podkarpackie Voivodeship",
    country_name: "Poland",
    country_code: "PL"
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

//  let EDITED = {
//     building_number: 0,
//     apartment_number: 0,
//     street_name: "TestEdited",
//     city_name: "Rzeszów",
//     voivodeship_name: "Podkarpackie Voivodeship",
//     country_name: "Poland",
//     country_code: "PL"
//  };
//   describe("/EDIT Address" ,() => {
//     let address = {};
//     before(async () => {
//         address = await Address.create(
//         TestAddress
//     );
//    });
//       it("it should EDIT Department",  (done) => {
//          chai
//          .request(app)
//          .put("/api/address/edit/" + address.id )
//          .set({'x-access-token': token})
//          .send(EDITED)
//          .end(async (err, res) => {
//            res.should.have.status(200);
//         //    response = await Address.findOne({
//         //      where: { id: address.id}
//         //    });
//         //    response.street.name.should.be.equal(EDITED.street_name);
//         //    response.street.city.name.should.be.equal(EDITED.city_name);
//            done();
//          });
//     });
//   });
    after(async () => {
        Address.destroy({
            where : {
                apartment_number: 0,
                building_number: 0
            }
        });
    })
   
});
